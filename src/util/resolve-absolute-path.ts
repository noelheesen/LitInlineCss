import path from 'path'
import resolve from 'resolve'

const resolveAbsolutePath = (
  importSource: string,
  absoluteSourcePath: string,
  rootDir?: string,
  moduleNameMappings?: Record<string, string>
): string | undefined => {
  const inputSourceCopy = importSource.slice()
  let absolutePath: string | undefined = undefined

  if (moduleNameMappings && rootDir) {
    for (const [k, v] of Object.entries(moduleNameMappings)) {
      if (importSource.startsWith(k)) {
        inputSourceCopy.replace(k, v)
        absolutePath = path.resolve(rootDir, inputSourceCopy)
        return absolutePath
      }
    }
  }

  if (importSource.startsWith('.')) {
    absolutePath = path.resolve(absoluteSourcePath, '..', importSource)
  } else {
    try {
      absolutePath = resolve.sync(importSource, { basedir: rootDir })
    } catch (error) {
      console.warn(
        `LitInlineCss could not resolve absolute path for: ${importSource}`
      )
      return
    }
  }

  return absolutePath
}

export default resolveAbsolutePath
