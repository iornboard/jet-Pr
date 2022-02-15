import prepro from '@/module/prepro/prepro'
import {sampleFilePath, resultFileDir} from '../../../config/custom.env'

describe('prepro.js', () => {
  window.URL.createObjectURL = jest.fn()

  afterEach(() => {
    window.URL.createObjectURL.mockReset()
  })

  it('custom contents', () => {
    const fs = require('fs')
    const time = new Date()
    var text = fs.readFileSync(sampleFilePath, 'utf8')

    prepro.readToXmlFile(text)

    // console.log(prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem.map(it => { it.filter.effect.name._text = 'A'; return it })) // 텍스트 일괄변경 테스트
    console.log(prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem.map(it => it.filter.effect.parameter[0].value ? JSON.parse(Buffer.from(it.filter.effect.parameter[0].value._text, 'base64').toString('utf16le').match(/\{[^)]*\}/)) : null))

    fs.writeFileSync(resultFileDir + '/result_' + time.toISOString().substring(0, 10) + '-' + time.toTimeString().substring(0, 8).replace(/:/gi, '') + '.xml', prepro.toString(), 'utf8', function (err) {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('Saved!')
    })
  })
})
