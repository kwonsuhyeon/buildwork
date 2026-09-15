import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            데이터 분석 · 시각화 · AI 강의
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance break-keep">
            교육과 연구, <span className="text-emerald-400">데이터</span>로{" "}
            <span className="text-emerald-400">일하는 방식</span>을 만듭니다
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl text-balance">
            교육·연구 현장의 데이터를 분석하고, 보이게 하고, 가르칩니다
          </p>

          <p className="mt-3 text-base text-slate-500">
            이론이 아닌 실전, 감이 아닌 검증.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hohoho3060@naver.com"
              className="btn-primary btn-lg w-full sm:w-auto"
            >
              프로젝트·강의 문의
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/about"
              className="btn-dark btn-lg w-full sm:w-auto"
            >
              BuildWork 소개
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
