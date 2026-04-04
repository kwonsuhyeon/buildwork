import type { Metadata } from "next"
import { getInsights } from "@/lib/notion"
import InsightsList from "./InsightsList"

export const revalidate = 60

export const metadata: Metadata = {
  title: "AI 인사이트",
  description: "AI와 실무에 관한 최신 인사이트를 확인하세요.",
}

export default async function InsightsPage() {
  const insights = await getInsights()

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Insights
          </span>
          <h1 className="page-hero-title">AI 인사이트</h1>
          <p className="page-hero-subtitle">
            AI 트렌드와 활용 노하우를 공유합니다. 실무에서 바로 적용 가능한 인사이트.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-container py-12">
        <InsightsList insights={insights} />
      </div>
    </div>
  )
}
