/**
 * Notion API 클라이언트 및 데이터 fetch 함수
 * buildwork 홈페이지 — Backend-Agent 작성
 *
 * 의존성: @notionhq/client
 * 환경변수: NOTION_API_KEY, NOTION_INSIGHTS_DB_ID,
 *           NOTION_RESOURCES_DB_ID, NOTION_CURATION_DB_ID
 */

import { Client, isNotionClientError } from "@notionhq/client"
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"
import type {
  Insight,
  InsightDetail,
  Resource,
  ResourceDetail,
  Curation,
  NotionBlock,
  NotionBlockType,
  NotionRichTextSegment,
  CurationRating,
} from "@/types/notion"

// ============================================================
// Notion 클라이언트 초기화
// ============================================================

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// ============================================================
// 내부 헬퍼 함수
// ============================================================

/**
 * Notion rich_text 배열을 평문 문자열로 변환
 */
function extractPlainText(richTextArray: RichTextItemResponse[]): string {
  return richTextArray.map((item) => item.plain_text).join("")
}

/**
 * Notion rich_text 배열을 세그먼트 배열로 변환 (볼드/링크 보존)
 */
function extractRichTextSegments(
  richTextArray: RichTextItemResponse[]
): NotionRichTextSegment[] {
  return richTextArray.map((item) => ({
    text: item.plain_text,
    href: item.href,
    annotations: {
      bold: item.annotations.bold,
      italic: item.annotations.italic,
      strikethrough: item.annotations.strikethrough,
      underline: item.annotations.underline,
      code: item.annotations.code,
      color: item.annotations.color,
    },
  }))
}

/**
 * Notion 페이지 프로퍼티에서 안전하게 값을 추출하는 헬퍼
 */
function getProperty(page: PageObjectResponse, name: string) {
  return page.properties[name]
}

// ============================================================
// Notion 블록 → 내부 타입 변환
// ============================================================

/**
 * Notion BlockObjectResponse를 내부 NotionBlock 타입으로 변환
 */
function transformBlock(block: BlockObjectResponse): NotionBlock {
  const base = { id: block.id }

  switch (block.type) {
    case "paragraph": {
      const rt = block.paragraph.rich_text
      return {
        ...base,
        type: "paragraph",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "heading_1": {
      const rt = block.heading_1.rich_text
      return {
        ...base,
        type: "heading_1",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "heading_2": {
      const rt = block.heading_2.rich_text
      return {
        ...base,
        type: "heading_2",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "heading_3": {
      const rt = block.heading_3.rich_text
      return {
        ...base,
        type: "heading_3",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "bulleted_list_item": {
      const rt = block.bulleted_list_item.rich_text
      return {
        ...base,
        type: "bulleted_list_item",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "numbered_list_item": {
      const rt = block.numbered_list_item.rich_text
      return {
        ...base,
        type: "numbered_list_item",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "code": {
      const rt = block.code.rich_text
      return {
        ...base,
        type: "code",
        text: extractPlainText(rt),
        language: block.code.language,
      }
    }
    case "quote": {
      const rt = block.quote.rich_text
      return {
        ...base,
        type: "quote",
        text: extractPlainText(rt),
        richText: extractRichTextSegments(rt),
      }
    }
    case "image": {
      const imageBlock = block.image
      const imageUrl =
        imageBlock.type === "external"
          ? imageBlock.external.url
          : imageBlock.type === "file"
          ? imageBlock.file.url
          : ""
      const captionText = extractPlainText(imageBlock.caption)
      return {
        ...base,
        type: "image",
        imageUrl,
        imageCaption: captionText,
      }
    }
    case "divider": {
      return { ...base, type: "divider" }
    }
    default: {
      return { ...base, type: "unsupported" }
    }
  }
}

// ============================================================
// Notion 페이지 → Insight 변환
// ============================================================

function transformPageToInsight(
  page: PageObjectResponse | PartialPageObjectResponse
): Insight | null {
  if (!("properties" in page)) return null

  try {
    const titleProp = getProperty(page, "제목")
    const summaryProp = getProperty(page, "내용")
    const tagsProp = getProperty(page, "태그")
    const publishedAtProp = getProperty(page, "발행일")
    const isPublicProp = getProperty(page, "공개여부")

    const title =
      titleProp?.type === "title" ? extractPlainText(titleProp.title) : ""
    const summary =
      summaryProp?.type === "rich_text"
        ? extractPlainText(summaryProp.rich_text)
        : ""
    const tags =
      tagsProp?.type === "multi_select"
        ? tagsProp.multi_select.map((s) => s.name)
        : []
    const publishedAt =
      publishedAtProp?.type === "date"
        ? (publishedAtProp.date?.start ?? null)
        : null
    const isPublic =
      isPublicProp?.type === "checkbox" ? isPublicProp.checkbox : false

    return {
      id: page.id,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      url: page.url,
      title,
      summary,
      tags,
      publishedAt,
      isPublic,
    }
  } catch (err) {
    console.error("[notion] transformPageToInsight 변환 실패:", err)
    return null
  }
}

// ============================================================
// Notion 페이지 → Resource 변환
// ============================================================

function transformPageToResource(
  page: PageObjectResponse | PartialPageObjectResponse
): Resource | null {
  if (!("properties" in page)) return null

  try {
    const titleProp = getProperty(page, "제목")
    const summaryProp = getProperty(page, "내용")
    const publishedAtProp = getProperty(page, "발행일")
    const isPublicProp = getProperty(page, "공개여부")
    const thumbProp = getProperty(page, "썸네일")

    const title =
      titleProp?.type === "title" ? extractPlainText(titleProp.title) : ""
    const summary =
      summaryProp?.type === "rich_text"
        ? extractPlainText(summaryProp.rich_text)
        : ""
    const publishedAt =
      publishedAtProp?.type === "date"
        ? (publishedAtProp.date?.start ?? null)
        : null
    const isPublic =
      isPublicProp?.type === "checkbox" ? isPublicProp.checkbox : false
    const thumbnailUrl =
      thumbProp?.type === "url" ? (thumbProp.url ?? null) : null

    return {
      id: page.id,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      url: page.url,
      title,
      summary,
      publishedAt,
      isPublic,
      thumbnailUrl,
    }
  } catch (err) {
    console.error("[notion] transformPageToResource 변환 실패:", err)
    return null
  }
}

// ============================================================
// Notion 페이지 → Curation 변환
// ============================================================

function transformPageToCuration(
  page: PageObjectResponse | PartialPageObjectResponse
): Curation | null {
  if (!("properties" in page)) return null

  try {
    const siteNameProp = getProperty(page, "사이트명")
    const urlProp = getProperty(page, "URL")
    const descProp = getProperty(page, "설명")
    const categoryProp = getProperty(page, "카테고리")
    const thumbProp = getProperty(page, "썸네일")
    const ratingProp = getProperty(page, "추천도")

    const siteName =
      siteNameProp?.type === "title"
        ? extractPlainText(siteNameProp.title)
        : ""
    const siteUrl = urlProp?.type === "url" ? (urlProp.url ?? null) : null
    const description =
      descProp?.type === "rich_text"
        ? extractPlainText(descProp.rich_text)
        : ""
    const category =
      categoryProp?.type === "select"
        ? (categoryProp.select?.name ?? null)
        : null
    const thumbnailUrl =
      thumbProp?.type === "url" ? (thumbProp.url ?? null) : null

    const VALID_RATINGS: CurationRating[] = ["★★★", "★★", "★"]
    const rawRating =
      ratingProp?.type === "select" ? ratingProp.select?.name : null
    const rating: CurationRating | null =
      rawRating && VALID_RATINGS.includes(rawRating as CurationRating)
        ? (rawRating as CurationRating)
        : null

    return {
      id: page.id,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      url: page.url,
      siteName,
      siteUrl,
      description,
      category,
      thumbnailUrl,
      rating,
    }
  } catch (err) {
    console.error("[notion] transformPageToCuration 변환 실패:", err)
    return null
  }
}

// ============================================================
// 공개 API 함수
// ============================================================

/**
 * AI 인사이트 목록 조회
 * - 공개여부 = true 인 항목만 반환
 * - 발행일 내림차순 정렬
 * - ISR revalidate: 60초 (page.tsx에서 설정)
 */
export async function getInsights(): Promise<Insight[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_INSIGHTS_DB_ID!,
      filter: {
        property: "공개여부",
        checkbox: { equals: true },
      },
      sorts: [{ property: "발행일", direction: "descending" }],
    })

    return response.results
      .map((page) => transformPageToInsight(page as PageObjectResponse | PartialPageObjectResponse))
      .filter((item): item is Insight => item !== null)
  } catch (err) {
    if (isNotionClientError(err)) {
      console.error("[notion] getInsights 오류:", err.code, err.message)
    } else {
      console.error("[notion] getInsights 알 수 없는 오류:", err)
    }
    return []
  }
}

/**
 * AI 인사이트 상세 조회 (페이지 메타 + 블록 콘텐츠)
 * @param id Notion 페이지 ID
 */
export async function getInsightById(id: string): Promise<InsightDetail | null> {
  try {
    const [page, blocksResponse] = await Promise.all([
      notion.pages.retrieve({ page_id: id }),
      notion.blocks.children.list({ block_id: id, page_size: 100 }),
    ])

    const insight = transformPageToInsight(page)
    if (!insight) return null

    const blocks: NotionBlock[] = blocksResponse.results
      .filter((block): block is BlockObjectResponse => "type" in block)
      .map(transformBlock)

    return { ...insight, blocks }
  } catch (err) {
    if (isNotionClientError(err)) {
      console.error(
        `[notion] getInsightById(${id}) 오류:`,
        err.code,
        err.message
      )
    } else {
      console.error(`[notion] getInsightById(${id}) 알 수 없는 오류:`, err)
    }
    return null
  }
}

/**
 * 강의자료 목록 조회
 * - 카테고리 = "공개" 인 항목만 반환
 * - 생성일 내림차순 정렬
 * - ISR revalidate: 3600초 (page.tsx에서 설정)
 */
export async function getResources(): Promise<Resource[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_RESOURCES_DB_ID!,
      filter: {
        property: "공개여부",
        checkbox: { equals: true },
      },
      sorts: [{ property: "발행일", direction: "descending" }],
    })

    return response.results
      .map((page) => transformPageToResource(page as PageObjectResponse | PartialPageObjectResponse))
      .filter((item): item is Resource => item !== null)
  } catch (err) {
    if (isNotionClientError(err)) {
      console.error("[notion] getResources 오류:", err.code, err.message)
    } else {
      console.error("[notion] getResources 알 수 없는 오류:", err)
    }
    return []
  }
}

/**
 * 큐레이션 목록 조회
 * - 전체 항목 반환
 * - 추천도 내림차순 정렬 (★★★ → ★★ → ★)
 * - ISR revalidate: 3600초 (page.tsx에서 설정)
 */
export async function getCurations(): Promise<Curation[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_CURATION_DB_ID!,
      sorts: [{ property: "추천도", direction: "descending" }],
    })

    return response.results
      .map((page) => transformPageToCuration(page as PageObjectResponse | PartialPageObjectResponse))
      .filter((item): item is Curation => item !== null)
  } catch (err) {
    if (isNotionClientError(err)) {
      console.error("[notion] getCurations 오류:", err.code, err.message)
    } else {
      console.error("[notion] getCurations 알 수 없는 오류:", err)
    }
    return []
  }
}

/**
 * generateStaticParams 용 — 모든 공개 인사이트 ID 목록 반환
 */
export async function getInsightIds(): Promise<{ id: string }[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_INSIGHTS_DB_ID!,
      filter: {
        property: "공개여부",
        checkbox: { equals: true },
      },
    })
    return response.results.map((page) => ({ id: page.id }))
  } catch (err) {
    console.error("[notion] getInsightIds 오류:", err)
    return []
  }
}

/**
 * 강의자료 상세 조회 (페이지 메타 + 블록 콘텐츠)
 */
export async function getResourceById(id: string): Promise<ResourceDetail | null> {
  try {
    const [page, blocksResponse] = await Promise.all([
      notion.pages.retrieve({ page_id: id }),
      notion.blocks.children.list({ block_id: id, page_size: 100 }),
    ])

    const resource = transformPageToResource(page)
    if (!resource) return null

    const blocks: NotionBlock[] = blocksResponse.results
      .filter((block): block is BlockObjectResponse => "type" in block)
      .map(transformBlock)

    return { ...resource, blocks }
  } catch (err) {
    if (isNotionClientError(err)) {
      console.error(`[notion] getResourceById(${id}) 오류:`, err.code, err.message)
    } else {
      console.error(`[notion] getResourceById(${id}) 알 수 없는 오류:`, err)
    }
    return null
  }
}

/**
 * generateStaticParams 용 — 모든 공개 강의자료 ID 목록 반환
 */
export async function getResourceIds(): Promise<{ id: string }[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_RESOURCES_DB_ID!,
      filter: {
        property: "공개여부",
        checkbox: { equals: true },
      },
    })
    return response.results.map((page) => ({ id: page.id }))
  } catch (err) {
    console.error("[notion] getResourceIds 오류:", err)
    return []
  }
}
