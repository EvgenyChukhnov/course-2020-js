import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || []
    this.name = options.name
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $innerEl = $.create('div', Component.className)
      const component = new Component($innerEl)
      // DEBUG
      // window['G' + component.name] = component
      // GFormula.destroy() - удаляет слушателей с Формулы
      // GHeader.destroy() - удаляет слушателей с Хедера
      $innerEl.html(component.toHTML())
      $root.append($innerEl)
      return component
    });
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(element => element.init());
  }
}