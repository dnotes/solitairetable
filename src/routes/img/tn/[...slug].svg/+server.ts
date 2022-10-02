import { error, type RequestEvent, type RequestHandler } from "@sveltejs/kit"

import getSvg from "../../_getSvg"

export const GET:RequestHandler = async (e:RequestEvent) => {

  if (!e.params.slug) throw error(400, "Bad Request")

  try {
    let svg = getSvg(e.params.slug, 160, 128, false)

    // Set cache headers and return the response
    e.setHeaders({
      'Cache-Control': 'public,max-age=2592000',
      'Content-Type': 'image/svg+xml',
    })

    return new Response(svg)

  }
  catch(err:any) {
    throw error(400, err?.message)
  }
}
