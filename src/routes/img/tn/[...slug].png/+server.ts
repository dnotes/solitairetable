import { error, type RequestEvent, type RequestHandler } from "@sveltejs/kit"
import sharp from 'sharp'

import getSvg from "../../_getSvg"

export const GET:RequestHandler = async (e:RequestEvent) => {

  if (!e.params.slug) error(400, "Bad Request");

  try {
    let svg = getSvg(e.params.slug!, 160, 128, false)
    let png = await sharp(Buffer.from(svg)).png().toBuffer()

    // Set cache headers and return the response
    e.setHeaders({
      'Cache-Control': 'public,max-age=2592000',
      'Content-Type': 'image/png',
    })

    return new Response(png)

  }
  catch(err:any) {
    error(400, err?.message);
  }
}
