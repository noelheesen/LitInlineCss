import type { CSSProcessResult } from '../types'

const process = async (
  source: string,
  absoluteSourcePath: string
): Promise<CSSProcessResult> => {
  const less = await import('less')
  const style = less.default
  const dependencies = new Set<string>()

  const { css, imports } = await new Promise((resolve, reject) => {
    style.render(
      source,
      {
        filename: absoluteSourcePath,
      },
      (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
    )
  })

  if (imports?.length > 0) {
    for (const i of imports) {
      dependencies.add(i)
    }
  }

  return {
    css,
    dependencies,
  }
}

const test = /\.less$/

export default {
  test,
  process,
}
