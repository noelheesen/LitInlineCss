import type { CSSProcessResult } from '../types'

const process = async (source: string): Promise<CSSProcessResult> => {
  const sass = await import('sass')
  const style = sass.default

  const { css } = await new Promise((resolve, reject) => {
    style.render(
      {
        data: source,
      },
      (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
    )
  })

  return {
    css: css.toString(),
  }
}

const test = /\.s(a|c)ss$/

export default {
  test,
  process,
}
