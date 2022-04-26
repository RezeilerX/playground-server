export type RawBlocks = IRawBlock[]

export interface IRawBlock {
  directory: string
  scripts: string[]
  styles: string[]
  manifest: string | boolean
}
