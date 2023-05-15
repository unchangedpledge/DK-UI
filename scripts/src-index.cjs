

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const IgnoreList = ['DataList', 'InputTitle']

const rootPath = path.resolve(__dirname, '../src')
const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
  .filter(v => !IgnoreList.includes(v))

const typeFiles = files.filter(n => fs.existsSync(path.resolve(rootPath, `${n}/interface.ts`)))

const line = () => {

  return `// Created by scripts/src-index.js.
import * as utils from './utils'

export { utils }

<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './<%= name %>'
<% }) -%>
`
}

const text = ejs.render(line(), { files })
fs.writeFileSync(`${rootPath}/index.js`, text)
