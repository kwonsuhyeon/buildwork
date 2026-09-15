import type { Metadata } from "next"
import { getResources } from "@/lib/notion"
import { ResourceCard } from "@/components/sections/ProjectCard"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "강의자료",
  description: "실무 중심의 강의자료를 제공합니다. 데이터 분석·AI 활용부터 웹개발 실무까지.",
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Resources
          </span>
          <h1 className="page-hero-title">강의자료</h1>
          <p className="page-hero-subtitle">
            실무 중심의 강의자료를 제공합니다. 카드를 클릭하면 사이트에서 바로 열람할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-container py-12">
        {/* Info Notice */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <svg className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-slate-500">
            공개 강의자료는 카드를 클릭해 바로 열람할 수 있습니다.
            비공개 자료는 <a href="mailto:hohoho3060@naver.com" className="text-emerald-600 hover:underline">문의</a>를 통해 안내받으실 수 있습니다.
          </p>
        </div>

        {resources.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 py-24 text-center">
            <svg className="mx-auto h-10 w-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <p className="text-slate-400">아직 등록된 강의자료가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
