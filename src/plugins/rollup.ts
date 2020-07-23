import type { Plugin, PluginContext } from 'rollup'
import litInlineCSSTransform from '../transform'

const name = 'rollup-plugin-lit-inline-css'

const factory = (): Plugin => {
  async function transform(this: PluginContext, contents: string, id: string) {
    const { js } = await litInlineCSSTransform(contents, id)

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
