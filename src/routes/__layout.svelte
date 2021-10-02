<script>
  import { page } from '$app/stores'
  let isTable = $page.path.match(/^\/play/)
  import "../app.css"
</script>

<div class="min-h-screen {isTable ? '' : 'flex flex-col'}">

  <div id="main" class="{isTable ? 'h-screen bg-green-800' : 'flex-grow w-full max-w-screen-lg mx-auto p-4'}">
    <slot></slot>
  </div>

  <footer class="h-10 w-full leading-10 px-12 text-xs bg-gray-900 text-white {isTable ? 'fixed bottom-0' : ''}">
    <a href="/">Home</a> |
    © 2021 David Hunt
  </footer>

</div>
