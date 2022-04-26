import { Router } from 'express'
import fs from 'fs/promises'
import { getFileName } from '../utils'

const router = Router()
const ROUTES_PATH = __dirname

/* eslint-disable @typescript-eslint/promise-function-async */
fs.readdir(ROUTES_PATH)
  .then(files => {
    return files
      .map(file => getFileName(file))
      .filter(fileName => fileName !== 'index')
      .map(async (fileName) => {
        return {
          module: await import(`./${fileName}`),
          name: fileName
        }
      })
  })
  .then(routesPromises => {
    return Promise.all(routesPromises)
  })
  .then(routes => {
    routes.forEach(route => {
      const { name, module } = route
      router.use(`/${name}`, module.default)
    })
  })
  .catch(console.error)

export default router
