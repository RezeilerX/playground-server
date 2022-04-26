/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { RequestHandler } from 'express'
import type { RawBlocks } from 'types'
import fs from 'fs'
import path from 'path'
import { BLOCKS_PATH, BLOCKS_URL } from 'config'
import { getFileName } from 'utils'

export const getRawBlocksFromFS = (): RawBlocks => {
  const blockDirectories = fs.readdirSync(BLOCKS_PATH)

  const rawBlocks = blockDirectories.map(directory => {
    const fullDirectory = path.resolve(BLOCKS_PATH, directory)
    const buildFilesDirectory = path.resolve(fullDirectory, 'build')

    const files = fs.readdirSync(buildFilesDirectory)

    const scripts: string[] = []
    const styles: string[] = []

    files.forEach(file => {
      const extension = path.extname(file)

      if (extension === '.js') {
        scripts.push(file)
        return
      }

      if (extension === '.css') {
        styles.push(file)
      }
    })

    // Try to find a manifest file
    // First in the build directory
    let manifest: string | boolean = false
    const manifestOnBuildDirectory = files.find(file => file.includes('block.json'))

    if (manifestOnBuildDirectory) {
      manifest = path.resolve(buildFilesDirectory, 'block.json')
    }

    // Finally at the block directory
    if (!manifest) {
      try {
        const manifestPath = path.resolve(fullDirectory, 'block.json')
        if (fs.existsSync(manifestPath)) {
          manifest = manifestPath
        }
      } catch {}
    }

    return {
      directory: fullDirectory,
      manifest,
      scripts,
      styles
    }
  })

  return rawBlocks
}

const getFormattedBlocksFromFS = () => {
  const rawBlocks = getRawBlocksFromFS()

  const formattedBlocks = rawBlocks.map(rawBlock => {
    const { directory, manifest, scripts, styles } = rawBlock
    const slug = getFileName(directory)
    const blockUrl = `${BLOCKS_URL}/${slug}`

    return {
      slug,
      scripts: scripts.map(scriptName => `${blockUrl}/script/${scriptName}`),
      styles: styles.map(styleName => `${blockUrl}/style/${styleName}`),
      manifest: manifest && fs.readFileSync(manifest as string).toJSON()
    }
  })

  return formattedBlocks
}

const blocks = getRawBlocksFromFS()

const getBlocks: RequestHandler = (req, res) => {
  res.send(blocks)
}

const getBlock: RequestHandler = (req, res) => {
  // const { slug } = req.params

  // const block = blocks.find(block => block.slug === slug)

  // if (block !== undefined) {
  //   res.send(block)
  //   return
  // }

  // res.status(404)
  // res.send({
  //   message: "The block doesn't exist"
  // })
}

export {
  getBlocks,
  getBlock
}
