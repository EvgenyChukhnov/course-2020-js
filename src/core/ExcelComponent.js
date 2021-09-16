import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners, options.name)
    this.prepare()
  }

  prepare() {}
  // return components template
  toHTML() {
    return '<h1>hello from ExcelComponent</h1>'
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}