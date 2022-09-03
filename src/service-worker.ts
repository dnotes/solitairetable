// @ts-ignore
import { build, files, prerendered, version } from '$service-worker'
import { precacheAndRoute, type PrecacheEntry } from 'workbox-precaching'

let cacheEntries:PrecacheEntry[] = [
  ...build,
  // for some reason, npm build script generates phantom .DS_Store
  // @ts-ignore
  ...files.filter(v => !/(?:\.DS_Store|\.nojekyll)$/.test(v)),
  ...prerendered,
].map(url => ({ url, revision: version }))
precacheAndRoute(cacheEntries)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // @ts-ignore
    self.skipWaiting()
  }
})