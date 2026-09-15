import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getResourceById, getResourceIds } from "@/lib/notion"
import NotionContent, { TableOfContents } from "@/components/notion/NotionContent"

export const revalidate = 60

interface PageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  return getResourceIds()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resource = await getResourceById(params.id)
  if (!resource) return { title: "강의자료를 찾을 수 없습니다" }
  return {
    title: resource.title,
    description: resource.summary || undefined,
  }
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const resource = await getResourceById(params.id)

  if (!resource || !resource.isPublic) {
    notFound()
  }

  const formattedDate = resource.publishedAt
    ? new Date(resource.publishedAt).toLocaleDateString("ko-KR", {
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
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            강의자료 목록으로
          </Link>

          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl max-w-3xl text-balance">
            {resource.title}
          </h1>

          {formattedDate && (
            <time className="mt-4 block text-sm text-slate-400" dateTime={resource.publishedAt ?? ""}>
              {formattedDate}
            </time>
          )}

          {resource.summary && (
            <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed">
              {resource.summary}
            </p>
          )}
        </div>
      </section>

      {/* Article Body */}
      <div className="section-container py-12">
        <div className="flex gap-12 items-start">
          <article className="min-w-0 flex-1 max-w-3xl">
            {resource.blocks.length > 0 ? (
              <NotionContent blocks={resource.blocks} />
            ) : (
              <p className="text-slate-400">콘텐츠를 불러올 수 없습니다.</p>
            )}

            <div className="mt-12 pt-8 border-t border-slate-100">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </article>

          <TableOfContents blocks={resource.blocks} />
        </div>
      </div>
    </div>
  )
}
