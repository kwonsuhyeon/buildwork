import Link from "next/link"
import Image from "next/image"

const NAV_LINKS = [
  { href: "/about",     label: "소개" },
  { href: "/resources", label: "강의자료" },
  { href: "/insights",  label: "AI 인사이트" },
  { href: "/curation",  label: "큐레이션" },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <Image
                src="/logos/logo-horizontal-white.png"
                alt="BuildWork"
                width={480}
                height={120}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              이론이 아닌 실전, 트렌드가 아닌 쓸모.<br />
              AI로 일하는 방식을 다시 만듭니다.
            </p>
            <a
              href="mailto:hohoho3060@naver.com"
              className="mt-3 inline-block text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              hohoho3060@naver.com
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="푸터 네비게이션">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              페이지
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} buildwork. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Powered by Notion + Next.js 14
          </p>
        </div>
      </div>
    </footer>
  )
}
