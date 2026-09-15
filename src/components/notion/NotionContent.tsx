import type { ReactNode } from "react"
import type { NotionBlock, NotionRichTextSegment } from "@/types/notion"

/**
 * Notion 블록 공용 렌더러
 * - insights/[id], resources/[id] 상세 페이지에서 공유
 * - rich text(볼드/이탤릭/링크/인라인코드) 렌더링
 * - 연속된 리스트 아이템을 ul/ol로 그룹핑
 * - 헤딩에 id 앵커 부여 (목차 이동용)
 */

// ============================================================
// Rich Text
// ============================================================

function isExternalHref(href: string | null): href is string {
  return !!href && /^https?:\/\//.test(href)
}

export function RichText({
  segments,
  fallback,
}: {
  segments?: NotionRichTextSegment[]
  fallback?: string
}) {
  if (!segments || segments.length === 0) {
    return <>{fallback ?? ""}</>
  }

  return (
    <>
      {segments.map((seg, i) => {
        let node: ReactNode = seg.text

        if (seg.annotations.code) {
          node = (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.875em] text-rose-600">
              {node}
            </code>
          )
        }
        if (seg.annotations.bold) node = <strong className="font-semibold text-slate-900">{node}</strong>
        if (seg.annotations.italic) node = <em>{node}</em>
        if (seg.annotations.strikethrough) node = <s>{node}</s>
        if (seg.annotations.underline) node = <u>{node}</u>

        if (isExternalHref(seg.href)) {
          node = (
            <a
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
            >
              {node}
            </a>
          )
        }

        return <span key={i}>{node}</span>
      })}
    </>
  )
}

// ============================================================
// Block Renderer
// ============================================================

function RenderBlock({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return block.text ? (
        <p className="mb-4 text-slate-700 leading-relaxed">
          <RichText segments={block.richText} fallback={block.text} />
        </p>
      ) : (
        <br />
      )

    case "heading_1":
      return (
        <h2
          id={block.id}
          className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2"
        >
          <RichText segments={block.richText} fallback={block.text} />
        </h2>
      )

    case "heading_2":
      return (
        <h3 id={block.id} className="mt-8 mb-3 scroll-mt-24 text-xl font-bold text-slate-900">
          <RichText segments={block.richText} fallback={block.text} />
        </h3>
      )

    case "heading_3":
      return (
        <h4 id={block.id} className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-slate-900">
          <RichText segments={block.richText} fallback={block.text} />
        </h4>
      )

    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="mb-1.5 text-slate-700 leading-relaxed">
          <RichText segments={block.richText} fallback={block.text} />
        </li>
      )

    case "code":
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-slate-200">
          {block.language && block.language !== "plain text" && (
            <div className="flex items-center bg-slate-800 px-4 py-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {block.language}
              </span>
            </div>
          )}
          <pre className="overflow-x-auto bg-slate-900 p-4 text-sm text-slate-100">
            <code>{block.text}</code>
          </pre>
        </div>
      )

    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-emerald-400 bg-emerald-50 py-3 pl-5 pr-4 rounded-r-lg">
          <p className="text-slate-700 italic leading-relaxed">
            <RichText segments={block.richText} fallback={block.text} />
          </p>
        </blockquote>
      )

    case "divider":
      return <hr className="my-8 border-slate-200" />

    case "image":
      return block.imageUrl ? (
        <figure className="my-8">
          {/* Notion file URL은 만료되므로 next/image 최적화 캐시 대신 원본 사용 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.imageUrl}
            alt={block.imageCaption || "본문 이미지"}
            className="w-full rounded-xl border border-slate-100"
          />
          {block.imageCaption && (
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              {block.imageCaption}
            </figcaption>
          )}
        </figure>
      ) : null

    default:
      return null
  }
}

// ============================================================
// 블록 목록 렌더링 (리스트 그룹핑 포함)
// ============================================================

type BlockGroup =
  | { kind: "single"; block: NotionBlock }
  | { kind: "list"; listType: "ul" | "ol"; items: NotionBlock[]; id: string }

function groupBlocks(blocks: NotionBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = []

  for (const block of blocks) {
    const listType =
      block.type === "bulleted_list_item" ? "ul" :
      block.type === "numbered_list_item" ? "ol" : null

    if (!listType) {
      groups.push({ kind: "single", block })
      continue
    }

    const last = groups[groups.length - 1]
    if (last && last.kind === "list" && last.listType === listType) {
      last.items.push(block)
    } else {
      groups.push({ kind: "list", listType, items: [block], id: block.id })
    }
  }

  return groups
}

export default function NotionContent({ blocks }: { blocks: NotionBlock[] }) {
  const groups = groupBlocks(blocks)

  return (
    <div>
      {groups.map((group) => {
        if (group.kind === "single") {
          return <RenderBlock key={group.block.id} block={group.block} />
        }
        const List = group.listType
        return (
          <List
            key={group.id}
            className={`mb-4 ml-5 ${group.listType === "ul" ? "list-disc" : "list-decimal"}`}
          >
            {group.items.map((item) => (
              <RenderBlock key={item.id} block={item} />
            ))}
          </List>
        )
      })}
    </div>
  )
}

// ============================================================
// TOC Sidebar (앵커 링크)
// ============================================================

export function TableOfContents({ blocks }: { blocks: NotionBlock[] }) {
  const headings = blocks.filter(
    (b) => b.type === "heading_1" || b.type === "heading_2" || b.type === "heading_3"
  )

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block sticky top-24 w-56 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        목차
      </p>
      <nav aria-label="목차">
        <ul className="space-y-1.5 text-sm">
          {headings.map((h) => {
            const indent =
              h.type === "heading_1" ? "" :
              h.type === "heading_2" ? "ml-3" : "ml-6"
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`${indent} block text-slate-500 hover:text-indigo-600 transition-colors duration-150 line-clamp-2`}
                >
                  {h.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
