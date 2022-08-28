// @ts-ignore
import { build, files } from '$service-worker'
import { precacheAndRoute } from 'workbox-precaching'

let cacheEntries = [
  ...build,
  // for some reason, npm build script generates phantom .DS_Store
  // @ts-ignore
  ...files.filter(v => !/(?:\.DS_Store|\.nojekyll$)/.test(v.url))
]
precacheAndRoute(cacheEntries)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // @ts-ignore
    self.skipWaiting()
  }
})
