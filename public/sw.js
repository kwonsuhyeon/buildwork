/**
 * BuildWork service worker — 1단계 (설치 + 오프라인 폴백)
 *
 * - 오프라인 폴백 페이지(/offline.html, 외부 리소스 없는 단일 파일)만 캐시한다.
 * - 페이지·Notion 데이터·이미지는 캐시하지 않고 항상 네트워크로 요청한다.
 *   (Notion 이미지 서명 URL 만료, ISR 갱신 지연 방지)
 * - 페이지 이동(navigate) 요청이 네트워크 오류로 실패할 때만 /offline.html을 보여준다.
 */

const CACHE_VERSION = "buildwork-v1"
const OFFLINE_URL = "/offline.html"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" })))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_VERSION)
      return (await cache.match(OFFLINE_URL)) || Response.error()
    })
  )
})
