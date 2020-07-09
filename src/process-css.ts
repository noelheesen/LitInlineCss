import { isAbsolute } from 'path'
import { less, postcss, sass, stylus } from '@/css-processors'
import immutable from '@/util/immutable'
import type { PostCSSProcessResult } from '@/types'

const defaultProcessors = [less, sass, stylus]

const processCSS = async (
  source: string,
  absoluteSourcePath: string
): Promise<Readonly<PostCSSProcessResult>> => {
  if (!isAbsolute(absoluteSourcePath)) {
    throw new Error(
      `LitCssInline argument 'absoluteSourcePath' is not absolute for '${absoluteSourcePath}'`
    )
  }

  let rawCSS = source.slice()

  for (const processor of defaultProcessors) {
    if (absoluteSourcePath.match(processor.test)) {
      const result = await processor.process(rawCSS, absoluteSourcePath)
      rawCSS = result.css
      break
    }
  }

  const { css, classmap } = await postcss.process(rawCSS, absoluteSourcePath)

  return immutable({
    css,
    classmap,
  })
}

export default processCSS
