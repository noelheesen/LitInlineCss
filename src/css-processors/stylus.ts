import type { CSSProcessResult } from '../types'

const process = async (
  source: string,
  absoluteSourcePath: string
): Promise<CSSProcessResult> => {
  const stylus = await import('stylus')
  const style = stylus.default(source, {
    filename: absoluteSourcePath,
  })

  const dependencies = new Set<string>()

  const css = await new Promise<string>((resolve, reject) => {
    style.render((err, css) => {
      if (err) {
        reject(err)
      }

      resolve(css)
    })
  })

  const deps = style.deps(absoluteSourcePath)
  if (deps.length > 0) {
    for (const d of deps) {
      dependencies.add(d)
    }
  }

  return {
    css,
    dependencies,
  }
}

const test = /\.(styl|stylus)$/

export default {
  test,
  process,
}
