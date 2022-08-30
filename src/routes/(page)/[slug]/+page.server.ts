import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export type Value = string|number|Date|undefined|Array<Value>|{[key:string]:Value}

export type Content = {
  attributes: {
    title?: string
    icon?: string
    [key:string]: Value
  }
  html: string
}

export const load:PageLoad = async (req) => {
  try {
    let allContent = import.meta.glob('/*.md')
    let slug = '/' + req.params.slug.toLowerCase().replace(/^about$/, 'README') + '.md'
    if (allContent[slug]) {
      // @ts-ignore
      let content:Content = await allContent[slug]()
      let item = {
        attributes: content?.attributes,
        html: content?.html
      }
      return { content:item }
    }
  }
  catch(e:any) {
    throw error(500, e.message)
  }
  throw error(404, "not found")
}
