// @ts-ignore
import { build, files } from '$service-worker'
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute([...build, ...files])

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // @ts-ignore
    self.skipWaiting()
  }
})
