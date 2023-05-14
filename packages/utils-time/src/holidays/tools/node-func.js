import fs from 'fs'
import path from 'path'
import util from 'util'
import { __dirname } from '../../polyfill/node-path.js'

const readFile = util.promisify(fs.readFile)

export const readFileAsync = async (path, encode) => {
  try {
    const data = await readFile(path, encode)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const transPath = originalPath => path.join(__dirname, originalPath)
