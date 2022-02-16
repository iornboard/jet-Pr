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

    // 텍스트 디코딩
    // console.log(prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem.map(it => { it.filter.effect.name._text = 'A'; return it })) // 텍스트 일괄변경 테스트
    var str = prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem
      .map(it => it.filter.effect.parameter[0].value ? Buffer.from(it.filter.effect.parameter[0].value._text, 'base64').toString('utf16le') : null)
      .map(it => it ? {head: it.split(/\{[^)]*\}/)[0], body: JSON.parse(it.match(/\{[^)]*\}/)[0])} : it)

    // console.log(str)

    // 텍스트 일괄변경
    str = str.map(it => { if (it) it.body.mTextParam.mStyleSheet.mText = '안녕하세요 ㅋㅋ'; return it })
    // console.log(str.map(it => it ? it.body.mTextParam.mStyleSheet.mText : it)) // Q. map에서 내용이 유지되는가?

    // 재 인코딩
    str = str.map(it => it ? Buffer.from(it.head + JSON.stringify(it.body), 'utf16le').toString('base64') : it)
    prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem = prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem
      .map((it, idx) => { if (it.filter.effect.parameter[0].value) it.filter.effect.parameter[0].value = str[idx]; return it })

    fs.writeFileSync(resultFileDir + '/result_' + time.toISOString().substring(0, 10) + '-' + time.toTimeString().substring(0, 8).replace(/:/gi, '') + '.xml', prepro.toString(), 'utf8', function (err) {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('Saved!')
    })
  })
})
