import { error, type RequestEvent, type RequestHandler } from "@sveltejs/kit"

import { Resvg } from '@resvg/resvg-js'
import { join } from 'path'

import getSvg from "../_getSvg"

export const GET:RequestHandler = async (e:RequestEvent) => {

  if (!e.params.slug) error(400, "Bad Request");

  try {
    let svg = getSvg(e.params.slug!)

    // Configure resvg with your font
    // In SvelteKit, static files are available at the root of the deployed site
    const fontPath = join(process.cwd(), 'static/fonts/Cinzel/static/Cinzel-SemiBold.ttf')

    const opts = {
      font: {
        fontFiles: [fontPath], // Path to your font file
        loadSystemFonts: false, // Don't load system fonts to ensure consistency
        defaultFontFamily: 'Cinzel'
      },
      background: 'transparent',
    }

    const resvg = new Resvg(svg, opts)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    // Set cache headers and return the response
    e.setHeaders({
      'Cache-Control': 'public,max-age=2592000',
      'Content-Type': 'image/png',
    })

    return new Response(pngBuffer)
  }
  catch(err:any) {
    error(400, err?.message);
  }
}
