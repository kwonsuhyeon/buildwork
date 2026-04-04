import Image from "next/image"
import Link from "next/link"
import Badge from "@/components/ui/Badge"
import type { Resource, Curation } from "@/types/notion"

// ============================================================
// ResourceCard
// ============================================================

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const formattedDate = resource.publishedAt
    ? new Date(resource.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Link href={`/resources/${resource.id}`} className="group block h-full">
      <article className="card-default h-full flex flex-col">
        {/* Thumbnail */}
        {resource.thumbnailUrl ? (
          <div className="relative h-36 w-full overflow-hidden bg-slate-100">
            <Image
              src={resource.thumbnailUrl}
              alt={resource.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-36 w-full bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center">
            <svg className="h-10 w-10 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-2">
            <Badge variant="accent" size="sm">강의자료</Badge>
          </div>
          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {resource.title}
          </h3>
          {resource.summary && (
            <p className="mt-2 text-sm text-slate-500 line-clamp-2 flex-1">
              {resource.summary}
            </p>
          )}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            {formattedDate && (
              <time className="text-xs text-slate-400" dateTime={resource.publishedAt ?? ""}>
                {formattedDate}
              </time>
            )}
            <div className="flex items-center gap-1 text-xs text-indigo-500 font-medium group-hover:text-indigo-700 ml-auto">
              자세히 보기
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ============================================================
// CurationCard
// ============================================================

interface CurationCardProps {
  curation: Curation
}

const RATING_COLORS: Record<string, string> = {
  "★★★": "text-amber-500",
  "★★":  "text-amber-400",
  "★":   "text-slate-400",
}

export function CurationCard({ curation }: CurationCardProps) {
  const href = curation.siteUrl ?? "#"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article className="card-default h-full flex flex-col">
        {/* Thumbnail */}
        {curation.thumbnailUrl ? (
          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
            <Image
              src={curation.thumbnailUrl}
              alt={curation.siteName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-40 w-full bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
            <svg className="h-10 w-10 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 flex-1">
              {curation.siteName}
            </h3>
            {curation.rating && (
              <span
                className={`shrink-0 text-sm font-medium ${RATING_COLORS[curation.rating] ?? "text-slate-400"}`}
                title={`추천도: ${curation.rating}`}
              >
                {curation.rating}
              </span>
            )}
          </div>

          {curation.category && (
            <Badge variant="primary" size="sm" className="mb-2 w-fit">
              {curation.category}
            </Badge>
          )}

          {curation.description && (
            <p className="text-sm text-slate-500 line-clamp-2 flex-1">
              {curation.description}
            </p>
          )}

          {href !== "#" && (
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
              사이트 방문
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          )}
        </div>
      </article>
    </a>
  )
}
