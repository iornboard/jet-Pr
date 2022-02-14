import prepro from '@/module/prepro/prepro'

describe('prepro.js', () => {
  window.URL.createObjectURL = jest.fn()

  afterEach(() => {
    window.URL.createObjectURL.mockReset()
  })

  it('readToXmlFile contents', () => {
    prepro.readToXmlFile('<xmeml version="4">hello</xmeml>')
    // const tobe = {elements: [{attributes: {version: '4'}, elements: [{text: 'hello', type: 'text'}], name: 'xmeml', type: 'element'}]}  // non-compact read
    const tobe = {xmeml: {'_attributes': {version: '4'}, '_text': 'hello'}}

    expect(prepro.prepro).toEqual(tobe)
  })

  it('toString contents', () => {
    expect(prepro.toString()).toEqual('<xmeml version="4">hello</xmeml>')
  })

  it('exportToXmlFile contents', () => {
    prepro.exportToXmlFile('sample')
  })
})
