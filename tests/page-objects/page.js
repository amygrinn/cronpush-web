module.exports = class Page {
  constructor(path) {
    this.path = path
    this.open = this.open.bind(this)
  }

  open() {
    return browser.url(this.path || '')
  }
}
