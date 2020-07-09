import type { CSSProcessResult } from '@/types'

const process = async (source: string): Promise<CSSProcessResult> => {
  const less = await import('less')
  const style = less.default

  const { css } = await new Promise((resolve, reject) => {
    style.render(source, {}, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })

  return {
    css,
  }
}

const test = /\.less$/

export default {
  test,
  process,
}
