export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // уведомляет слушателей о событии ??
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return

    this.listeners[event].forEach(listener => {
      listener(...args)
    });
    return true
  }

  // подписываемся на уведомления или добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}