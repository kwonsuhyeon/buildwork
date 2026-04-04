import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getInsightById, getInsightIds } from "@/lib/notion"
import Badge from "@/components/ui/Badge"
import type { NotionBlock } from "@/types/notion"

export const revalidate = 60

interface PageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  return getInsightIds()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const insight = await getInsightById(params.id)
  if (!insight) return { title: "인사이트를 찾을 수 없습니다" }
  return {
    title: insight.title,
    description: insight.summary || undefined,
  }
}

// ============================================================
// Block Renderer
// ============================================================

function RenderBlock({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return block.text ? (
        <p className="mb-4 text-slate-700 leading-relaxed">{block.text}</p>
      ) : (
        <br />
      )

    case "heading_1":
      return (
        <h2 className="mt-10 mb-4 text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
          {block.text}
        </h2>
      )

    case "heading_2":
      return (
        <h3 className="mt-8 mb-3 text-xl font-bold text-slate-900">
          {block.text}
        </h3>
      )

    case "heading_3":
      return (
        <h4 className="mt-6 mb-2 text-lg font-semibold text-slate-900">
          {block.text}
        </h4>
      )

    case "bulleted_list_item":
      return (
        <li className="mb-1.5 ml-4 list-disc text-slate-700 leading-relaxed">
          {block.text}
        </li>
      )

    case "numbered_list_item":
      return (
        <li className="mb-1.5 ml-4 list-decimal text-slate-700 leading-relaxed">
          {block.text}
        </li>
      )

    case "code":
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-slate-200">
          {block.language && block.language !== "plain text" && (
            <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
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
          <p className="text-slate-700 italic leading-relaxed">{block.text}</p>
        </blockquote>
      )

    case "divider":
      return <hr className="my-8 border-slate-200" />

    case "image":
      return block.imageUrl ? (
        <figure className="my-8">
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
// TOC Sidebar
// ============================================================

function TableOfContents({ blocks }: { blocks: NotionBlock[] }) {
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
                <span
                  className={`${indent} block text-slate-500 hover:text-indigo-600 transition-colors duration-150 cursor-default line-clamp-2`}
                >
                  {h.text}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

// ============================================================
// Page
// ============================================================

export default async function InsightDetailPage({ params }: PageProps) {
  const insight = await getInsightById(params.id)

  if (!insight || !insight.isPublic) {
    notFound()
  }

  const formattedDate = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <div className="bg-white">
      {/* Article Header */}
      <section className="bg-slate-900 py-16">
        <div className="section-container">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            AI 인사이트 목록으로
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {insight.tags.map((tag) => (
              <Badge key={tag} variant="dark" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl max-w-3xl text-balance">
            {insight.title}
          </h1>

          {formattedDate && (
            <time
              className="mt-4 block text-sm text-slate-400"
              dateTime={insight.publishedAt ?? ""}
            >
              {formattedDate}
            </time>
          )}

          {insight.summary && (
            <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed">
              {insight.summary}
            </p>
          )}
        </div>
      </section>

      {/* Article Body */}
      <div className="section-container py-12">
        <div className="flex gap-12 items-start">
          {/* Main Content */}
          <article className="min-w-0 flex-1 max-w-3xl">
            {insight.blocks.length > 0 ? (
              <div>
                {insight.blocks.map((block) => (
                  <RenderBlock key={block.id} block={block} />
                ))}
              </div>
            ) : (
              <p className="text-slate-400">콘텐츠를 불러올 수 없습니다.</p>
            )}

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </article>

          {/* TOC */}
          <TableOfContents blocks={insight.blocks} />
        </div>
      </div>
    </div>
  )
}
