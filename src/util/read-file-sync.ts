import path from 'path'
import fs from 'fs'

const readFileSync = (...partials: string[]): string => {
  return fs.readFileSync(path.resolve(...partials), 'utf-8').toString()
}

export default readFileSync
