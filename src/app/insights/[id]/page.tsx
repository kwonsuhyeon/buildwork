import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getInsightById, getInsightIds } from "@/lib/notion"
import Badge from "@/components/ui/Badge"
import NotionContent, { TableOfContents } from "@/components/notion/NotionContent"

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
              <NotionContent blocks={insight.blocks} />
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
