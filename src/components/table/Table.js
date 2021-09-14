import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldReszie } from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onClick() {}

  onMousedown(event) {
    if (shouldReszie(event)) {
      resizeHandler(this.$root, event)
    }
  }
  // onMousemove() {}

  // onMouseup() {}
}