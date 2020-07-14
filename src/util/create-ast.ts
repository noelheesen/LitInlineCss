import * as acorn from 'acorn'
import type { DynamicAcornNode } from '@/types'

const createAST = (source: string): DynamicAcornNode => {
  const AST: DynamicAcornNode = acorn.parse(source, {
    sourceType: 'module',
  })

  return AST
}

export default createAST
