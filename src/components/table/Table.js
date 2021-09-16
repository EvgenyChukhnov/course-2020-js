import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { isCell, shouldReszie } from './table.functions';
import { TableSelection } from './TableSelection';
import { multiplySelectCells } from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
      name: 'Table'
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
    const $cell = this.$root.find('[data-id="A:1"]')
    this.selection.select($cell)
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
        this.selection.select($target)
      }
    }
  }
}