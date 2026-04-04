"use client"

import { useState, useMemo } from "react"
import { CurationCard } from "@/components/sections/ProjectCard"
import type { Curation, CurationRating } from "@/types/notion"

interface CurationListProps {
  curations: Curation[]
}

const RATING_ORDER: (CurationRating | "기타")[] = ["★★★", "★★", "★", "기타"]
const RATING_LABEL: Record<CurationRating | "기타", string> = {
  "★★★": "강력 추천",
  "★★":  "추천",
  "★":   "참고",
  "기타": "기타",
}

export default function CurationList({ curations }: CurationListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("전체")

  // Collect all unique categories
  const categories = useMemo(() => {
    const catSet = new Set<string>()
    curations.forEach((c) => {
      if (c.category) catSet.add(c.category)
    })
    return ["전체", ...Array.from(catSet).sort()]
  }, [curations])

  const filtered = useMemo(() => {
    if (activeCategory === "전체") return curations
    return curations.filter((c) => c.category === activeCategory)
  }, [curations, activeCategory])

  // Group by rating
  const grouped = useMemo(() => {
    const g: Record<string, Curation[]> = {}
    for (const item of filtered) {
      const key = item.rating ?? "기타"
      if (!g[key]) g[key] = []
      g[key].push(item)
    }
    return g
  }, [filtered])

  if (curations.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">아직 등록된 큐레이션이 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="카테고리 필터">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-tab ${
              activeCategory === cat ? "filter-tab-active" : "filter-tab-inactive"
            }`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grouped by Rating */}
      {filtered.length > 0 ? (
        <div className="space-y-14">
          {RATING_ORDER.map((rating) => {
            const items = grouped[rating]
            if (!items || items.length === 0) return null

            return (
              <section key={rating} aria-labelledby={`rating-${rating}`}>
                <div className="mb-6 flex items-center gap-3">
                  {rating !== "기타" && (
                    <span className="text-lg font-medium text-amber-500" aria-hidden="true">
                      {rating}
                    </span>
                  )}
                  <h2
                    id={`rating-${rating}`}
                    className="text-lg font-semibold text-slate-900"
                  >
                    {RATING_LABEL[rating]}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                    {items.length}개
                  </span>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((curation) => (
                    <CurationCard key={curation.id} curation={curation} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400">해당 카테고리의 큐레이션이 없습니다.</p>
        </div>
      )}
    </>
  )
}
