import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "소개",
  description: "buildwork 소개 — 교육과 연구를 위한 데이터 분석·시각화·AI 강의",
}

const PROJECTS = [
  {
    title: "AI 디지털 교육자료(AIDT) 효과성 연구",
    period: "2025.08 ~ 2026.04",
    description: "AI 기반 디지털 교육자료의 학습 효과성을 데이터 분석으로 검증하는 연구 프로젝트.",
    url: "https://guide-app-theta.vercel.app/",
    tags: ["AI", "교육", "데이터 분석"],
  },
  {
    title: "AI·빅데이터 기반 직업훈련기관 프로파일링 분석",
    period: "2025.10 ~ 2026.02",
    description: "AI와 빅데이터를 활용하여 직업훈련기관의 특성을 분석하고 인사이트를 도출하는 대시보드.",
    url: "https://dashboard-beryl-alpha-50.vercel.app",
    tags: ["빅데이터", "대시보드", "직업훈련"],
  },
  {
    title: "AI기반 영어 맞춤형 학습 사이트 구축",
    period: "2025.09 ~ 2026.03",
    description: "AI기반 모듈형 학습 사이트 구축",
    url: "https://imazin.vercel.app/",
    tags: ["맞춤형학습", "대시보드", "영어"],
  },
  {
    title: "정보기술개발 직업훈련교사 포트폴리오",
    period: "상시",
    description: "Java/Spring/React 기반 웹개발 직업훈련교사로서의 강의 이력 및 포트폴리오.",
    url: "https://ncsdevapp.vercel.app/",
    tags: ["Java", "Spring", "React", "NCS"],
  },
  {
    title: "정보기술개발 직무 로드맵 기반 STEP 강의 추천",
    period: "상시",
    description: "정보기술개발 직무 로드맵을 기반으로 학습자에게 맞춤형 STEP 강의를 추천하는 진단·추천 사이트.",
    url: "https://jobpath-ai.vercel.app/diagnose",
    tags: ["직무 로드맵", "강의 추천", "맞춤형학습", "STEP"],
  },
]

const PROJECT_HISTORY = [
  {
    period: "2026 ~ 진행 중",
    title: "프로젝트 자문",
    role: "자문",
    org: "한국산업인력공단",
    description: "AI·데이터 기반 직무·교육·역량평가 체계 및 기술 검토 자문",
    tags: ["자문", "AI", "데이터 분석"],
  },
  {
    period: "2026.09 ~ 2026.12",
    title: "STEP 학습자 페르소나 분석 및 맞춤형 서비스 전략 연구",
    role: "데이터 분석 · 페르소나 정의",
    org: "STEP",
    description: "STEP 학습자 행동 데이터 분석을 통한 학습자 페르소나 정의 및 페르소나별 맞춤형 서비스 전략 도출",
    tags: ["페르소나", "데이터 분석", "맞춤형학습"],
  },
  {
    period: "2026.05 ~ 2026.09",
    title: "성인 대상 직업공통능력인증 모의 테스트 및 수요조사 연구",
    role: "수요조사 분석 · 시각화",
    org: "대한상공회의소",
    description: "직업공통능력인증 모의 테스트 결과 및 수요조사 데이터 분석, 통계 분석 결과 시각화",
    tags: ["수요조사", "데이터 분석", "시각화"],
  },
  {
    period: "",
    title: "학교 현장의 내신 평가 현황 분석을 위한 성취분포 비율 수집 및 분석",
    role: "크롤링 · 분석 · 시각화",
    org: "한국교육과정평가원",
    description: "웹 크롤링 기반 성취분포 비율 데이터 수집, Python 통계 분석 및 대시보드 시각화 구현",
    tags: ["크롤링", "데이터 분석", "대시보드"],
  },
  {
    period: "2025.08 ~ 2026.04",
    title: "AI 디지털 교육자료(AIDT) 효과성 연구",
    role: "데이터 분석 전담",
    org: "한국교과서연구재단",
    description: "학습자 행동 로그 기반 분석 지표 정의, 학습 데이터 DB 구축, Python 기반 통계 분석 및 연구 보고서 작성 지원",
    tags: ["AI", "데이터 분석", "교육"],
    url: "https://guide-app-theta.vercel.app/",
  },
  {
    period: "2025.10 ~ 2026.02",
    title: "AI·빅데이터 기반 직업훈련기관 프로파일링 및 성과편차 분석체계 고도화 방안 연구",
    role: "데이터 분석 · 시각화",
    org: "직업능력심사평가원",
    description: "정보기술개발 직종 훈련과정 심층 분석, 성과 분석 지표 설계, Python 기반 데이터 시각화 및 대시보드 구축",
    tags: ["빅데이터", "대시보드", "직업훈련"],
    url: "https://dashboard-beryl-alpha-50.vercel.app",
  },
  {
    period: "2025.10 ~ 2026.02",
    title: "대학교육 통합성과관리체계를 위한 대학 IR 시스템 개선 연구",
    role: "IR 시각화 개선",
    org: "한국기술교육대학교 데이터성과센터",
    description: "IBM Cognos 기반 대학 성과 지표 시각화 대시보드 구축 및 IR 시스템 개선 방향 도출",
    tags: ["IR", "대시보드", "데이터 분석"],
  },
  {
    period: "2025.12 ~ 2026.02",
    title: "고교교육과정 변화에 따른 2028학년도 대학입학전형 개발 연구",
    role: "분석 자문",
    org: "한국기술교육대학교 입학팀",
    description: "성적 등급 체계 변환 모델 설계(9등급→5등급), 입학 데이터 시뮬레이션 및 영향 분석",
    tags: ["데이터 분석", "시뮬레이션", "입학전형"],
  },
  {
    period: "2026.02 ~ 2026.03",
    title: "직업계고 채용연계형 직무교육과정 취업 성과창출 및 유지 방안 연구",
    role: "분석 자문",
    org: "대한상공회의소",
    description: "반정형 인터뷰 데이터 텍스트 마이닝, TF-IDF 특징어 분석, 공기어 네트워크 분석 및 KWIC·감성 분석",
    tags: ["텍스트 마이닝", "NLP", "컨설팅"]
  },
  {
    period: "2025.08",
    title: "직업능력개발훈련교사 역량기반 교직훈련과정 개편 방안 연구",
    role: "과정명세서 작성",
    org: "한국기술교육대학교 HRD교육팀",
    description: "직업훈련교사 대상 AI 입문 교육과정 커리큘럼 설계, 생성형 AI 및 데이터 활용 기초 6회차 교육 모듈 설계",
    tags: ["커리큘럼", "AI 교육", "HRD"],
  },
  {
    period: "2024.10 ~ 2024.11",
    title: "교육데이터 웹페이지 프로토타입 레이아웃 설계 자문",
    role: "자문",
    org: "한국교육과정평가원",
    description: "교육데이터 제공 플랫폼 프로토타입 UI/UX 설계 자문 및 웹 인터페이스 레이아웃 구조 설계 검토",
    tags: ["UI/UX", "프로토타입", "교육데이터"],
  },
  {
    period: "2023.10 ~ 2024.09",
    title: "STEP 위키 정보기술개발 분야 전문가 칼럼니스트",
    role: "칼럼니스트",
    org: "한국기술교육대학교 온라인평생교육원",
    description: "STEP 플랫폼에서 프로그래밍 학습 및 개발 직무 관련 기술 콘텐츠 제작, IT 직무 학습 정보 제공",
    tags: ["콘텐츠", "IT 직무", "칼럼"],
  },
]

const CAREER_ITEMS: { period: string; title: string; org: string; items?: string[] }[] = [
  {
    period: "상시",
    title: "AI 활용 특강",
    org: "능력개발교육원 · 대학원 · 대학교 · 상공회의소 대상 강의",
    items: [
      "Claude Code를 활용한 직업훈련 평가 혁신 및 AI 에이전트 설계",
      "생성형 AI를 활용한 연구 에이전트 설계",
      "AI를 활용한 통계 분석 및 데이터 시각화",
      "직업훈련교사 자격과정 생성형 AI 기초 온라인 강의",
    ],
  },
  {
    period: "2025.10 ~ 2026.02",
    title: "AI 기초 입문 과정 강사",
    org: "한국기술교육대학교 능력개발교육원",
  },
  {
    period: "2022.06 ~ 2025.09",
    title: "정보기술개발 직업훈련교사",
    org: "그린컴퓨터아트학원 — Java / Spring / React 웹개발 강의",
  },
]

const EDUCATION_ITEMS = [
  {
    period: "2026 ~ ",
    title: "한국기술교육대학교 컴퓨터공학부 박사과정 재학 중",
    detail: "컴퓨터공학부 박사과정",
    thesis: "",
  },
  {
    period: "2024 ~ 2026",
    title: "한국기술교육대학교 테크노인력개발전문대학원 석사",
    detail: "인력개발전공",
    thesis: "논문: AI를 활용한 프로그래밍 교육의 통합적 문헌 고찰",
  },
  {
    period: "2017 ~ 2022",
    title: "한국기술교육대학교 컴퓨터공학 학사",
    detail: "HRD 부전공",
    thesis: "작품: 딥러닝 기반 이미지 분석을 활용한 작문 로봇 개발",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            About
          </span>
          <h1 className="page-hero-title flex items-center gap-4 flex-wrap">
            <Image
              src="/logos/logo-horizontal-white.png"
              alt="BuildWork"
              width={900}
              height={237}
              className="h-9 w-auto object-contain sm:h-10"
            />
            소개
          </h1>
          <p className="page-hero-subtitle">
            &lsquo;AI를 안다&rsquo;와 &lsquo;AI를 쓴다&rsquo; 사이, 그 간극을 좁힙니다
          </p>
        </div>
      </section>

      <div className="section-container py-16 space-y-20">

        {/* Company Introduction */}
        <section aria-labelledby="company-heading">
          <div className="max-w-3xl">
            <div className="mb-8">
              <Image
                src="/logos/logo-horizontal.png"
                alt="BuildWork"
                width={900}
                height={237}
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 id="company-heading" className="text-2xl font-bold text-slate-900 mb-6 break-keep">
              쌓인 데이터를, 읽히는 인사이트로
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed break-keep">
              <p>
                <strong className="text-slate-900">BuildWork</strong>는 교육과 연구의 데이터를 다루는 지식 플랫폼입니다. 직접 가르치고, 데이터를 분석하고, 복잡한 결과를 누구나 한눈에 읽는 대시보드로 옮겨 왔습니다.
              </p>
              <p>
                이론이 아닌 실전, 감이 아닌 검증 — 교육과 연구 현장에서 직접 부딪히며 얻은 인사이트를 솔직하게 나눕니다. <strong className="text-slate-900">데이터를 분석하고, 보이게 하고, 가르치는 일.</strong> 교육과 연구가 데이터로 더 나은 결정을 내리도록 돕는 것, 그것이 BuildWork입니다.
              </p>
            </div>

            {/* Badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
              <svg className="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-emerald-800">청춘잡담 여성창업자금지원 대상 선정</p>
                <p className="text-xs text-emerald-600 mt-0.5"><strong>BuildWork</strong>는 청춘잡담 여성창업자금지원 프로그램의 지원 대상으로 선정되었습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Representative Profile */}
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="text-2xl font-bold text-slate-900 mb-8">
            대표 프로필
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Info */}
            <div>
              <div className="flex items-start gap-4 mb-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900">
                  <Image
                    src="/logos/logo-symbol-white.png"
                    alt="BuildWork 심볼"
                    width={120}
                    height={120}
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">권수현</h3>
                  <p className="text-slate-500 text-sm mt-0.5">대표 · 강사 · 연구자</p>
                  <a
                    href="mailto:hohoho3060@naver.com"
                    className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    hohoho3060@naver.com
                  </a>
                </div>
              </div>

              {/* Career Timeline */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">
                  경력
                </h4>
                <div className="timeline">
                  {CAREER_ITEMS.map((item, idx) => (
                    <div key={idx} className="relative">
                      <span className="timeline-dot" style={{ top: "4px" }} />
                      <p className="timeline-date">{item.period}</p>
                      <p className="timeline-title">{item.title}</p>
                      <p className="timeline-sub">{item.org}</p>
                      {item.items && item.items.length > 0 && (
                        <ul className="mt-2 space-y-1 list-disc pl-4 text-sm text-slate-600">
                          {item.items.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">
                학력
              </h4>
              <div className="timeline">
                {EDUCATION_ITEMS.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="timeline-dot" style={{ top: "4px" }} />
                    <p className="timeline-date">{item.period}</p>
                    <p className="timeline-title">{item.title}</p>
                    <p className="timeline-sub">{item.detail}</p>
                    {item.thesis && (
                      <p className="mt-1 text-sm text-slate-500 italic">{item.thesis}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-heading">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                프로젝트
              </p>
              <h2 id="projects-heading" className="text-2xl font-bold text-slate-900">
                주요 프로젝트
              </h2>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="card-default h-full p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
                      {project.title}
                    </h3>
                    <svg className="h-4 w-4 text-slate-400 shrink-0 mt-0.5 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-emerald-600 mb-2">{project.period}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{project.description}</p>
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
              </a>
            ))}
          </div>
        </section>

        {/* Project History */}
        <section aria-labelledby="history-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              이력
            </p>
            <h2 id="history-heading" className="text-2xl font-bold text-slate-900">
              프로젝트 · 자문 전체 이력
            </h2>
          </div>

          <div className="space-y-0">
            {PROJECT_HISTORY.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-8 pb-10 last:pb-0 border-l-2 border-slate-200"
              >
                {/* Dot */}
                <span className="absolute -left-[9px] top-0.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white" />

                {/* Role badge + period */}
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {item.role}
                  </span>
                  {item.period && (
                    <span className="text-xs text-slate-400">{item.period}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-900 leading-snug mb-1">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {item.title}
                      <svg className="inline-block ml-1 h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>

                {/* Org */}
                <p className="text-sm text-slate-500 mb-2">{item.org}</p>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
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
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-xl font-bold text-white mb-3">함께 일하고 싶으신가요?</h2>
          <p className="text-slate-400 text-sm mb-6">
            AI 교육, 강의, 연구 협업에 대한 문의를 환영합니다.
          </p>
          <a
            href="mailto:hohoho3060@naver.com"
            className="btn-primary btn-md"
          >
            문의하기
          </a>
        </section>

      </div>
    </div>
  )
}
