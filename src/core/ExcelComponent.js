import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options)
    this.name = options.name || '',
    this.listeners = options.listeners,
    this.emitter = options.emitter,
    this.unsubscribers = []

    this.prepare()
  }

  // первичная настройка компонента до метода init()
  prepare() {
    // console.log(`prepare ${this.name}`)
  }

  // return components template
  toHTML() {
    return '<h1>hello from ExcelComponent</h1>'
  }

  // уведомление слушателя об event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписка на event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализация компонента
  // добавление DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // удаление компонента
  // удаление слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(el => el())
  }
}