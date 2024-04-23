class CustomContextMenu {
  constructor(config) {
    this.config = config
    this.cm = document.createElement('UL')
    this.loadHTML()
    this.setEL()
  }
  loadHTML() {
    this.cm.classList.add('context')
    if (this.config.dark) this.cm.classList.add('context--dark')
    if (this.config.RTL) this.cm.setAttribute('dir', 'rtl')
    this.config.items.forEach(item => this.cm.append(this.generateItem(item)))
    document.body.append(this.cm)
  }
  generateItem({ label, cb, isLine }) {
    let item;
    if (isLine) 
      item = document.createElement('hr')
    else {
      item = document.createElement('li')
      item.classList.add('context__item')
      item.addEventListener('click', cb)
      item.innerText = label
    }
    return item
  }
  updateMenuPosition(x, y) {
    const maxLeftValue = window.innerWidth - this.cm.offsetWidth
    const maxTopValue = window.innerHeight - this.cm.offsetHeight
    this.cm.style.left = `${Math.min(maxLeftValue, x)}px`
    this.cm.style.top = `${Math.min(maxTopValue, y)}px`
  }
  setEL() {
    document.addEventListener('click', () => this.cm.style.visibility = null)
    document.addEventListener('contextmenu', e => {
      e.preventDefault()
      this.updateMenuPosition(e.clientX, e.clientY)
      this.cm.style.visibility = "visible"
    })
  }
}