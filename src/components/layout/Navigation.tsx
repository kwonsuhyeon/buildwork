"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/about",     label: "소개" },
  { href: "/resources", label: "강의자료" },
  { href: "/insights",  label: "AI 인사이트" },
  { href: "/curation",  label: "큐레이션" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden gap-8 md:flex" aria-label="주 네비게이션">
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`nav-link pb-1 ${isActive ? "nav-link-active" : "nav-link-inactive"}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
