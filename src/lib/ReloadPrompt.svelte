<script lang="ts">

import { dev, browser } from '$app/environment';

if (!dev && browser) {
  (async () => {
    if ('serviceWorker' in navigator) {
      const { Workbox, messageSW } = await import('workbox-window');
      const wb = new Workbox('/service-worker.js');
      let registration:any;

      // this will always activate the new build on available

      // if you want you can show a prompt to user instead
      // whether they wish to actiavte now and restart the page
      // thereby losing their current webapp state
      // or they want restart later
      const skipWaiting = () => {
        // fires when the waiting service worker becomes active
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        // since the user accepted the prompt we should skip_waiting
        if (registration?.waiting) {
          messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        }
      };

      // fires when service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', skipWaiting);
      //   @ts-ignore
      wb.addEventListener('externalwaiting', skipWaiting);

      wb.register().then((r) => (registration = r));
    }
  })();
}

</script>
