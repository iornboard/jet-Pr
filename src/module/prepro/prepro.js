import convert from 'xml-js'

var prepro

function readToXmlFile (xml) {
  this.prepro = convert.xml2js(xml, {compact: true})
}

export default {
  prepro: prepro,
  readToXmlFile: readToXmlFile
}
