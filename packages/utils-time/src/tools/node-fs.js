import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)

export const readFileAsync = async (path, encode) => {
  try {
    const data = await readFile(path, encode)
    return data
  } catch (error) {
    console.error(error)
  }
}
