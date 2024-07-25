import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

export const stringToHtml = async(text:string)=>{
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      // or `theme` for a single theme
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    })
    .use(rehypeStringify)
    .process(text)
    return file;
  }