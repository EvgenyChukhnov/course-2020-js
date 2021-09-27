class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  append(node) {
    if (node instanceof Dom) node = node.$el
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  clear() {
    this.html('')
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(el => this.$el.style[el] = styles[el])
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  focus() {
    this.$el.focus()
    return this
  }

  get data() {
    return this.$el.dataset
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':')
      return {
        col: id[0],
        row: +id[1]
      }
    }
    return this.data.id
  }

  idNum(parse) {
    if (parse) {
      const idNum = this.idNum().split(':')
      return {
        col: +idNum[0],
        row: +idNum[1]
      }
    }
    return this.data.idNum
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)
  return $(el)
}