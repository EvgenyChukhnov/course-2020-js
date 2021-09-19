import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || []
    this.emitter = new Emitter()
    this.name = options.name || 'excel-components-wrapper'
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = { emitter: this.emitter }

    this.components = this.components.map(Component => {
      const $innerEl = $.create('div', Component.className)
      const component = new Component($innerEl, componentOptions) // class ExcelComponent

      $innerEl.html(component.toHTML())
      $root.append($innerEl)
      return component
    });
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(el => el.init());
  }

  destroy() {
    this.components.forEach(el => el.destroy())
  }
}