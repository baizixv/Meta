import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const transPath = originalPath => path.join(__dirname, originalPath)
