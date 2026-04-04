/**
 * Notion CMS 타입 정의
 * buildwork 홈페이지 — Backend-Agent 작성
 */

// ============================================================
// 공통 타입
// ============================================================

/** Notion 페이지 공통 메타데이터 */
export interface NotionPageBase {
  id: string
  createdTime: string
  lastEditedTime: string
  url: string
}

/** Notion rich_text 배열에서 추출한 평문 */
export type RichTextPlain = string

// ============================================================
// AI 인사이트 (Insights DB)
// ============================================================

/**
 * AI 인사이트 아이템 — 목록 페이지용
 * Notion DB: NOTION_INSIGHTS_DB_ID
 */
export interface Insight extends NotionPageBase {
  /** 아티클 제목 (title 프로퍼티) */
  title: string
  /** 아티클 요약/본문 요약 (rich_text 프로퍼티 "내용") */
  summary: RichTextPlain
  /** 태그 목록 (multi_select 프로퍼티 "태그") */
  tags: string[]
  /** 발행일 ISO 8601 (date 프로퍼티 "발행일") — 예: "2026-04-01" */
  publishedAt: string | null
  /** 공개 여부 (checkbox 프로퍼티 "공개여부") */
  isPublic: boolean
}

/**
 * AI 인사이트 상세 — 상세 페이지용
 * retrievePage + blocks.children.list 결합
 */
export interface InsightDetail extends Insight {
  /** Notion 블록 콘텐츠 배열 (렌더링용) */
  blocks: NotionBlock[]
}

// ============================================================
// 강의자료 (Resources DB)
// ============================================================

/**
 * 강의자료 아이템 — 목록 페이지용
 * Notion DB: NOTION_RESOURCES_DB_ID (인사이트 DB와 동일 구조)
 */
export interface Resource extends NotionPageBase {
  title: string
  summary: RichTextPlain
  publishedAt: string | null
  isPublic: boolean
  thumbnailUrl: string | null
}

/**
 * 강의자료 상세 — 상세 페이지용
 */
export interface ResourceDetail extends Resource {
  blocks: NotionBlock[]
}

// ============================================================
// 큐레이션 (Curation DB)
// ============================================================

/**
 * 큐레이션 아이템
 * Notion DB: NOTION_CURATION_DB_ID
 */
export interface Curation extends NotionPageBase {
  /** 사이트명 (title 프로퍼티 "사이트명") */
  siteName: string
  /** 외부 사이트 URL (url 프로퍼티 "URL") */
  siteUrl: string | null
  /** 사이트 설명 (rich_text 프로퍼티 "설명") */
  description: RichTextPlain
  /** 카테고리 분류 (select 프로퍼티 "카테고리") */
  category: string | null
  /** 썸네일 이미지 URL (url 프로퍼티 "썸네일") */
  thumbnailUrl: string | null
  /** 추천 강도 (select 프로퍼티 "추천도") */
  rating: CurationRating | null
}

/** 큐레이션 추천도 */
export type CurationRating = "★★★" | "★★" | "★"

// ============================================================
// Notion 블록 타입 (상세 페이지 렌더링용)
// ============================================================

/** 지원하는 Notion 블록 타입 */
export type NotionBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "code"
  | "image"
  | "quote"
  | "divider"
  | "unsupported"

/** Notion 블록 단위 */
export interface NotionBlock {
  id: string
  type: NotionBlockType
  /** 텍스트 콘텐츠 (paragraph, heading, list, quote, code 타입) */
  text?: string
  /** HTML 렌더링용 rich text (볼드/이탤릭/링크 포함) */
  richText?: NotionRichTextSegment[]
  /** 코드 블록 언어 */
  language?: string
  /** 이미지 URL */
  imageUrl?: string
  /** 이미지 대체 텍스트 */
  imageCaption?: string
  /** 중첩 블록 (목록 아이템 하위 등) */
  children?: NotionBlock[]
}

/** Notion rich_text 세그먼트 (볼드/이탤릭/링크 정보 보존) */
export interface NotionRichTextSegment {
  text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

// ============================================================
// API 응답 래퍼 타입
// ============================================================

/** 성공 응답 래퍼 */
export interface ApiSuccess<T> {
  success: true
  data: T
}

/** 에러 응답 래퍼 */
export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

// ============================================================
// 페이지 Props 타입 (Next.js App Router)
// ============================================================

/** /insights/[id] 페이지 Props */
export interface InsightPageProps {
  params: { id: string }
}

/** generateStaticParams 반환 타입 */
export interface StaticParam {
  id: string
}
