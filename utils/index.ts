import path from 'path'

export const getFileName = (fullFileName: string): string => {
  return path.parse(fullFileName).name
}
