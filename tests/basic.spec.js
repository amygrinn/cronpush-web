const Page = require('./page-objects/page')

describe('Basic specification', () => {
  it('Should open', () => {
    const mainPage = new Page()
    return mainPage.open()
  })
})
