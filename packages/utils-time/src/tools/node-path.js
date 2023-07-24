import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const joinPath = p => path.join(__dirname, p)

export const resolvePath = p => path.resolve(__dirname, p)
