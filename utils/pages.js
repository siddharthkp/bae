import glob from 'glob'
import {resolve, basename, extname} from 'path'
import fs from 'fs'
import pageRenderer from './page-renderer'

module.exports = ({hot}) => {

  /* create .build and .build/pages */
  if (!fs.existsSync('./.build')) fs.mkdirSync('./.build')
  if (!fs.existsSync('./.build/pages')) fs.mkdirSync('./.build/pages')

  /* drop renderable pages */
  glob.sync('./pages/*.js')
  .map(file => fs.writeFileSync(`./.build/${file}`, pageRenderer(resolve(file)), 'utf8'))

  /* map of pages for entry point */
  const pages = {}
  glob.sync('./.build/pages/*.js')
  .map(file => pages[basename(file, extname(file))] = file)

  if (hot) {
    /* Add webpack-hot-middleware client for each entry point */
    const keys = Object.keys(pages)
    keys.map(key => pages[key] = [pages[key], 'webpack-hot-middleware/client'])
  }

  return pages
}
