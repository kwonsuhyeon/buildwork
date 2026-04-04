import type { Metadata } from "next"
import { getCurations } from "@/lib/notion"
import CurationList from "./CurationList"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "큐레이션",
  description: "엄선된 사이트, 아티클, 도구들을 공유합니다.",
}

export default async function CurationPage() {
  const curations = await getCurations()

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Curation
          </span>
          <h1 className="page-hero-title">큐레이션</h1>
          <p className="page-hero-subtitle">
            엄선된 사이트, 아티클, 도구들을 공유합니다.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-container py-12">
        <CurationList curations={curations} />
      </div>
    </div>
  )
}
