import * as fs from 'fs'
import * as plist from 'plist'

interface TextReplacementEntry {
  phrase: string
  shortcut: string
}

type StringMap = { [key: string]: string }

const packs = [
  'emoji',
  'vulgarity',
]

packs.forEach(pack => {
  const source = fs.readFileSync(`./src/packs/${pack}.json`, 'utf-8')
  const sourceJSON = JSON.parse(source) as StringMap
  const formattedSourceJSON = formatJSON(sourceJSON)
  const sourcePlist = plist.build(formattedSourceJSON as any)
  const dest = './dist/packs'
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  fs.writeFileSync(`./dist/packs/${pack}.plist`, sourcePlist, 'utf-8')
})

function formatJSON(json: { [key: string]: string }): TextReplacementEntry[] {
  return Object.keys(json).map(key => {
    return {
      phrase: json[key],
      shortcut: key,
    }
  })
}