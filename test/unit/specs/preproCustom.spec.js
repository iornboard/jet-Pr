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

    fs.writeFileSync(resultFileDir + '/result_' + time.toISOString().substring(0, 10) + '-' + time.toTimeString().substring(0, 8).replace(/:/gi, '') + '.xml', prepro.toString(), 'utf8', function (err) {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('Saved!')
    })
  })
})
