import Link from "next/link"
import Badge from "@/components/ui/Badge"
import type { Insight } from "@/types/notion"

interface ContentCardProps {
  insight: Insight
}

export default function ContentCard({ insight }: ContentCardProps) {
  const formattedDate = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Link href={`/insights/${insight.id}`} className="group block h-full">
      <article className="card-default h-full flex flex-col p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {insight.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="accent" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 flex-1">
          {insight.title}
        </h3>

        {/* Summary */}
        {insight.summary && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {insight.summary}
          </p>
        )}

        {/* Footer */}
        {formattedDate && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <time className="text-xs text-slate-400" dateTime={insight.publishedAt ?? ""}>
              {formattedDate}
            </time>
          </div>
        )}
      </article>
    </Link>
  )
}
