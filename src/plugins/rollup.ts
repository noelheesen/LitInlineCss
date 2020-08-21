import type { Plugin, PluginContext } from 'rollup'
import litInlineCSSTransform from '../transform'

const name = 'rollup-plugin-lit-inline-css'

const factory = (): Plugin => {
  async function transform(this: PluginContext, contents: string, id: string) {
    const { js, css } = await litInlineCSSTransform(contents, id)

    if (css.size > 0) {
      for (const importedCSS of css) {
        if (importedCSS.dependencies.size > 0) {
          for (const dep of importedCSS.dependencies) {
            this.addWatchFile(dep)
          }
        }
      }
    }

    return {
      code: js,
    }
  }

  const litInlineCSS = {
    name,
    transform,
  }

  return litInlineCSS
}

export default factory
