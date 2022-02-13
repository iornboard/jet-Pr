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

  console.log(a)

  a.click()
  setTimeout(function () { URL.revokeObjectURL(a.href) }, 1500)
}

export default {
  prepro: prepro,
  readToXmlFile: readToXmlFile,
  toString: toString,
  exportToXmlFile: exportToXmlFile
}
