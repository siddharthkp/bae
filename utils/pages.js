import glob from 'glob'
import {resolve, basename, extname} from 'path'
import fs from 'fs'
import pageRenderer from './page-renderer'

if (!fs.existsSync('./.build')) fs.mkdirSync('./.build')
if (!fs.existsSync('./.build/pages')) fs.mkdirSync('./.build/pages')

glob.sync('./pages/*.js')
.map(file => fs.writeFileSync(`./.build/${file}`, pageRenderer(resolve(file)), 'utf8'))

const pages = {}
glob.sync('./.build/pages/*.js')
.map(file => pages[basename(file, extname(file))] = file)

module.exports = pages
