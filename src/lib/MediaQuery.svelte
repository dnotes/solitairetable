<script lang="ts" context="module">

// @ts-ignore
import { browser } from '$app/environment';
import { readable, derived } from 'svelte/store'

  export const breakpoint = readable("l",(set)=>{
    if (!browser) {
        set('')
        return
    }
    const breakpoints = [
        { value: "xs", mediaquery: window.matchMedia("(orientation: portrait) and (max-width: 499px), (orientation: landscape) and (max-height: 499px)") },
        { value: "s", mediaquery: window.matchMedia("(orientation: portrait) and (min-width: 500px) and (max-width: 799px), (orientation: landscape) and (min-height: 500px) and (max-height: 799px)") },
        { value: "m", mediaquery: window.matchMedia("(orientation: portrait) and (min-width: 800px) and (max-width: 959px), (orientation: landscape) and (min-height: 800px) and (max-height: 959px)") },
        { value: "l", mediaquery: window.matchMedia("(orientation: portrait) and (min-width:  960px) and (max-width: 1439px), (orientation: landscape) and (min-height: 960px) and (max-height: 1439px)") },
        { value: "xl", mediaquery: window.matchMedia("(orientation: portrait) and (min-width: 1440px) and (max-width: 1919px), (orientation: landscape) and (min-height: 1440px) and (max-height: 1919px)") },
        { value: "xxl", mediaquery: window.matchMedia("(orientation: portrait) and (min-width: 1920px), (orientation: landscape) and (min-height: 1920px)") },
    ];

      for (let key in breakpoints) {
          let breakpoint = breakpoints[key];

          //set the current breakpoint
          if (breakpoint.mediaquery.matches === true) {
              // EventBus.$emit("breakpoint", breakpoint.value);
              set(breakpoint.value)
          }
          breakpoint.mediaquery.addEventListener('change',(event) => {
              if (event.matches === true) {
                  // EventBus.$emit("breakpoint", breakpoint.value);
                  set(breakpoint.value)
              }
          });
      }
  });

  export const platform = derived(breakpoint, $breakpoint => {
      if ($breakpoint == "xs" || $breakpoint == "s" || !$breakpoint) {
          return 'mobile';
      } else {
          return 'desktop';
      }
  });

  export const orientation = readable("landscape",(set)=>{
      if (!browser) {
          set('')
          return
      }
      const orientations = [
          { value: "portrait", mediaquery: window.matchMedia("(orientation: portrait)") },
          { value: "landscape", mediaquery: window.matchMedia("(orientation: landscape)") },
      ];

      for (let key in orientations) {
          let orientation = orientations[key];

          //set the current orientation
          if (orientation.mediaquery.matches === true) {
              set(orientation.value)
          }

          orientation.mediaquery.addEventListener('change',(event) => {
              if (event.matches === true) {
                  set(orientation.value)
              }
          });
      }
  });

  export const isMobileLandscape = derived([platform,orientation], ([$platform, $orientation]) => {
    return $platform === "mobile" && $orientation === "landscape";
  })

</script>
