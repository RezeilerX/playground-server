import path from 'path'

export const PROTOCOL = 'http'
export const HOSTNAME = 'localhost'
export const PORT = 80

export const BASE_URL = `${PROTOCOL}://${HOSTNAME}:${PORT}`

export const BLOCKS_PATH = path.resolve(process.cwd(), 'blocks')
export const BLOCKS_URL = `${BASE_URL}/blocks`
