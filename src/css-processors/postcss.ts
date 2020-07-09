import cssmodules from 'postcss-modules'
import type { Plugin } from 'postcss'
import type { PostCSSProcessResult } from '@/types'

const process = async (
  source: string,
  absoluteSourcePath: string
): Promise<PostCSSProcessResult> => {
  const postcss = await import('postcss')
  const style = postcss.default

  /**
   * Mapped classes from postcss-modules that may be referenced in the WebComponent.
   * this map will be used to replace those references by it's value.
   */
  const classmap = new Map<string, string>()

  // const { plugins = [] } = options
  const plugins: Plugin<unknown>[] = []
  const postCSSPlugins = Array.from(plugins)

  postCSSPlugins.push(
    cssmodules({
      // As CSS in lit elements is already scoped to the shadowdom we do not have to scope the classnames themselves.
      generateScopedName: '[local]',
      getJSON(_, json) {
        for (const [key, value] of Object.entries<string>(json)) {
          classmap.set(key, value)
        }
      },
    })
  )

  const processor = style(postCSSPlugins)
  const { css } = await processor.process(source, {
    from: absoluteSourcePath,
    to: absoluteSourcePath,
  })

  return {
    css,
    classmap,
  }
}

const test = /.+/

export default {
  test,
  process,
}
