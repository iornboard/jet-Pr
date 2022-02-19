import convert from 'xml-js'

var prepro

function readToXmlFile (xml) {
  this.prepro = convert.xml2js(xml, {compact: true})
}

function toString () {
  return convert.js2xml(this.prepro, {compact: true, ignoreComment: true, spaces: 4})
}

function exportToXmlFile (fileName = 'defult.xml') {
  const xml = convert.js2xml(this.prepro, {compact: true, ignoreComment: true, spaces: 4})
  const blob = new Blob([xml], {type: 'text/plain'})

  var a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['.xml', a.download, a.href].join(':')
  a.style.display = 'none'

  a.click()
  setTimeout(function () { URL.revokeObjectURL(a.href) }, 1500)
}

function decodeClipItems (clipitems) {
  return clipitems.map(it => {
    if (it.filter.effect.parameter[0].value) {
      const textValue = Buffer.from(it.filter.effect.parameter[0].value._text, 'base64').toString('utf16le')
      it.filter.effect.parameter[0].value = {head: textValue.split(/\{[^)]*\}/)[0], body: JSON.parse(textValue.match(/\{[^)]*\}/)[0])}
    }
    return it
  })
}

function encodeClipItems (clipitems) {
  return clipitems.map(it => {
    if (it.filter.effect.parameter[0].value) {
      const textValue = it.filter.effect.parameter[0].value
      it.filter.effect.parameter[0].value = Buffer.from(textValue.head + JSON.stringify(textValue.body), 'utf16le').toString('base64')
    }
    return it
  })
}

export default {
  prepro: prepro,
  readToXmlFile: readToXmlFile,
  toString: toString,
  exportToXmlFile: exportToXmlFile,
  decodeClipItems: decodeClipItems,
  encodeClipItems: encodeClipItems
}
