import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import {
  isCell,
  shouldReszie,
  multiplySelectCells,
  nextSelector
} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="A:1"]'))
    // подписки на events:
    this.$on('formula:input', text => this.selection.current.text(text)) // вставка текста
    this.$on('formula:done', () => this.selection.current.focus()) // фокус на ячейку
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldReszie(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = multiplySelectCells($target, this.selection.current)
            .map(id => this.$root.find(`[data-id-num="${id}"]`))
        this.selection.selectGroup($cells)
      } else if (event.ctrlKey) {
        this.selection.selectCtrl($target)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Shift',
      'Tab',
      'Control',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'Enter'
    ]

    const {key} = event
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.idNum(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}