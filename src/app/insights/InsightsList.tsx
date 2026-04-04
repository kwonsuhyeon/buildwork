"use client"

import { useState, useMemo } from "react"
import ContentCard from "@/components/sections/ContentCard"
import type { Insight } from "@/types/notion"

interface InsightsListProps {
  insights: Insight[]
}

export default function InsightsList({ insights }: InsightsListProps) {
  const [activeTag, setActiveTag] = useState<string>("전체")

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    insights.forEach((insight) => insight.tags.forEach((t) => tagSet.add(t)))
    return ["전체", ...Array.from(tagSet).sort()]
  }, [insights])

  const filtered = useMemo(() => {
    if (activeTag === "전체") return insights
    return insights.filter((i) => i.tags.includes(activeTag))
  }, [insights, activeTag])

  if (insights.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">아직 게시된 인사이트가 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      {/* Tag Filter */}
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="태그 필터">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`filter-tab ${
              activeTag === tag ? "filter-tab-active" : "filter-tab-inactive"
            }`}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mb-6 text-sm text-slate-400">
        {activeTag === "전체" ? `전체 ${insights.length}개` : `'${activeTag}' ${filtered.length}개`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight) => (
            <ContentCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400">해당 태그의 인사이트가 없습니다.</p>
        </div>
      )}
    </>
  )
}
