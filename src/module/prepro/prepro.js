import convert from 'xml-js'

var prepro

function readToXmlFile (xml) {
  this.prepro = convert.xml2js(xml, {compact: true})
}

function exportToString () {
  return convert.js2xml(this.prepro, {compact: true, ignoreComment: true, spaces: 4})
}

export default {
  prepro: prepro,
  readToXmlFile: readToXmlFile,
  exportToString: exportToString
}
