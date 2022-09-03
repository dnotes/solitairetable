// @ts-ignore
import { build, files, prerendered } from '$service-worker'
import { precacheAndRoute, type PrecacheEntry } from 'workbox-precaching'

const hash = () => Math.floor(2147483648 * Math.random()).toString(36);

let cacheEntries:PrecacheEntry[] = [
  ...build,
  // for some reason, npm build script generates phantom .DS_Store
  // @ts-ignore
  ...files.filter(v => !/(?:\.DS_Store|\.nojekyll$)/.test(v.url)),
  ...prerendered,
].map(url => ({ url, revision:hash() }))
precacheAndRoute(cacheEntries)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // @ts-ignore
    self.skipWaiting()
  }
})