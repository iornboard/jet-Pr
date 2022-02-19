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

    // to-do.1 clipitem을 기준으로 값을 가져갈 수 있도록 할 것(디코딩 시)

    // 텍스트 디코딩
    var clipitems = prepro.decodeClipItems(prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem)

    // 텍스트 일괄변경
    clipitems = clipitems.map(it => { if (it.filter.effect.parameter[0].value) it.filter.effect.parameter[0].value.body.mTextParam.mStyleSheet.mText = '2테스트 용2'; return it })

    // 텍스트 인코딩
    clipitems = prepro.encodeClipItems(clipitems)

    // 파일 적용
    prepro.prepro.xmeml.project.children.sequence.media.video.track[1].clipitem = clipitems

    fs.writeFileSync(resultFileDir + '/result_' + time.toISOString().substring(0, 10) + '-' + time.toTimeString().substring(0, 8).replace(/:/gi, '') + '.xml', prepro.toString(), 'utf8', function (err) {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('Saved!')
    })
  })
})
