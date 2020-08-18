import type { CSSProcessResult } from '../types'

const process = async (
  source: string,
  absoluteSourcePath: string
): Promise<CSSProcessResult> => {
  const sass = await import('sass')
  const style = sass.default

  const dependencies = new Set<string>()

  const { css, stats } = await new Promise((resolve, reject) => {
    style.render(
      {
        data: source,
        file: absoluteSourcePath,
      },
      (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
    )
  })

  if (stats.includedFiles?.length > 0) {
    for (const i of stats.includedFiles) {
      dependencies.add(i)
    }
  }

  return {
    css: css.toString(),
    dependencies,
  }
}

const test = /\.s(a|c)ss$/

export default {
  test,
  process,
}
