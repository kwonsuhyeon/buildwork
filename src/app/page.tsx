import type { Metadata } from "next"
import Link from "next/link"
import { getInsights } from "@/lib/notion"
import HeroSection from "@/components/sections/HeroSection"
import ContentCard from "@/components/sections/ContentCard"

export const revalidate = 60

export const metadata: Metadata = {
  title: "BuildWork — 교육과 연구를 위한 데이터 분석·시각화·AI 강의",
  description: "교육과 연구의 데이터를 분석하고 시각화하며, AI 활용을 가르칩니다",
}

// 사업 서비스 3축
const BUSINESS_SERVICES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: "데이터 분석",
    description: "웹 크롤링, 통계 분석, 텍스트 마이닝까지 — 교육과 연구 현장의 데이터에서 검증된 답을 찾습니다.",
    keywords: ["크롤링", "통계 분석", "텍스트 마이닝"],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "데이터 시각화",
    description: "복잡한 분석 결과를 누구나 한눈에 읽는 대시보드로 옮깁니다. 데이터가 의사결정으로 이어지도록.",
    keywords: ["대시보드", "IR 시각화", "리포팅"],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "AI 강의",
    description: "기관·대학·기업 현장에서 바로 써보는 AI 활용 교육을 진행합니다. 써봐야 내 것이 됩니다.",
    keywords: ["AI 입문 과정", "기관 특강", "커리큘럼 설계"],
  },
]

// 함께한 기관 (기관명만 공개 — 결과물 링크는 비공개 원칙)
const PARTNER_ORGS = [
  "한국교육과정평가원",
  "한국산업인력공단",
  "대한상공회의소",
  "직업능력심사평가원",
  "한국교과서연구재단",
  "한국기술교육대학교",
]

// 대표 프로젝트 (기관명 + 수행 내용만 노출)
const FEATURED_PROJECTS = [
  {
    title: "AI 디지털 교육자료(AIDT) 효과성 연구",
    org: "한국교과서연구재단",
    description: "학습자 행동 로그 기반 분석 지표 정의, 학습 데이터 DB 구축, Python 통계 분석",
    tags: ["AI", "데이터 분석", "교육"],
  },
  {
    title: "AI·빅데이터 기반 직업훈련기관 프로파일링 분석",
    org: "직업능력심사평가원",
    description: "훈련과정 심층 분석과 성과 지표 설계, 데이터 시각화 대시보드 구축",
    tags: ["빅데이터", "대시보드", "직업훈련"],
  },
  {
    title: "내신 평가 성취분포 비율 수집·분석",
    org: "한국교육과정평가원",
    description: "웹 크롤링 기반 데이터 수집, Python 통계 분석, 대시보드 시각화",
    tags: ["크롤링", "데이터 분석", "시각화"],
  },
]

// 콘텐츠 채널
const CONTENT_CHANNELS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "AI 인사이트",
    description: "AI 트렌드와 활용 노하우를 공유합니다. 실무에서 바로 활용 가능한 인사이트를 제공합니다.",
    href: "/insights",
    label: "인사이트 보기",
    accentColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "강의자료",
    description: "실무 중심의 강의자료를 제공합니다. 데이터 분석·AI 활용부터 웹개발 실무까지.",
    href: "/resources",
    label: "강의자료 보기",
    accentColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "큐레이션",
    description: "유용한 외부 리소스, 도구, 아티클을 엄선하여 공유합니다.",
    href: "/curation",
    label: "큐레이션 보기",
    accentColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
]

export default async function HomePage() {
  const insights = await getInsights()
  const recentInsights = insights.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Partner Orgs Strip */}
      <section className="border-b border-slate-100 bg-white py-10" aria-labelledby="partners-heading">
        <div className="section-container text-center">
          <p id="partners-heading" className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
            함께한 기관
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNER_ORGS.map((org) => (
              <li key={org} className="text-sm font-medium text-slate-500 sm:text-base">
                {org}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Business Services Section */}
      <section className="bg-white py-20" aria-labelledby="services-heading">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              무엇을 하나요
            </p>
            <h2
              id="services-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              데이터를 분석하고, 보이게 하고, 가르칩니다
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              교육과 연구 현장의 프로젝트를 세 가지 방식으로 돕습니다.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {BUSINESS_SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-emerald-50 p-3 text-emerald-600 mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="mailto:hohoho3060@naver.com" className="btn-primary btn-md">
              프로젝트·강의 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-slate-50 py-20" aria-labelledby="projects-heading">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                프로젝트
              </p>
              <h2
                id="projects-heading"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                이렇게 일해왔습니다
              </h2>
            </div>
            <Link
              href="/about"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              전체 이력 보기
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {FEATURED_PROJECTS.map((project) => (
              <div key={project.title} className="card-flat h-full p-6 bg-white">
                <p className="text-xs font-semibold text-emerald-600 mb-2">{project.org}</p>
                <h3 className="font-semibold text-slate-900 leading-snug mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/about" className="btn-outline btn-md">
              전체 이력 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Content Channels Section */}
      <section className="bg-white py-20" aria-labelledby="content-heading">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              콘텐츠
            </p>
            <h2
              id="content-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a6b] to-[#1a7a6b]">BuildWork</span> 콘텐츠
            </h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {CONTENT_CHANNELS.map((channel) => (
              <div
                key={channel.title}
                className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`inline-flex items-center justify-center rounded-xl p-3 ${channel.bgColor} ${channel.accentColor} mb-5`}>
                  {channel.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {channel.description}
                </p>
                <Link
                  href={channel.href}
                  className={`inline-flex items-center gap-1 text-sm font-medium ${channel.accentColor} hover:opacity-80 transition-opacity`}
                >
                  {channel.label}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights Section */}
      <section className="bg-slate-50 py-20" aria-labelledby="insights-heading">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                최신 콘텐츠
              </p>
              <h2
                id="insights-heading"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                최신 AI 인사이트
              </h2>
            </div>
            <Link
              href="/insights"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              전체 보기
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {recentInsights.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {recentInsights.map((insight) => (
                <ContentCard key={insight.id} insight={insight} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 py-20 text-center">
              <p className="text-slate-400">준비 중입니다. 곧 인사이트가 게시됩니다.</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/insights" className="btn-outline btn-md">
              전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20" aria-labelledby="cta-heading">
        <div className="section-container text-center">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm text-emerald-400 mb-6">
              BuildWork 소개
            </div>
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-white sm:text-3xl text-balance"
            >
              교육과 연구의 데이터, 함께 풀어볼까요?
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              데이터 분석과 시각화, AI 강의까지 — 교육과 연구 현장에서 검증된 방식으로
              <strong className="text-white"> BuildWork</strong>가 함께합니다.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/about" className="btn-primary btn-lg w-full sm:w-auto">
                더 알아보기
              </Link>
              <a
                href="mailto:hohoho3060@naver.com"
                className="btn-dark btn-lg w-full sm:w-auto"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
