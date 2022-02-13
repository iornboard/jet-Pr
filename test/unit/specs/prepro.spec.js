import prepro from '@/module/prepro/prepro'

describe('prepro.js', () => {
  window.URL.createObjectURL = jest.fn()

  afterEach(() => {
    window.URL.createObjectURL.mockReset()
  })

  it('exportToXmlFile contents', () => {
    prepro.exportToXmlFile('sample')
  })
})
