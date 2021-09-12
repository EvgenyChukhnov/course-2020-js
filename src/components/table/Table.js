import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom'

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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          const columnWidth =
            document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
          const deltaX = e.pageX - Math.trunc(coords.right)
          $parent.$el.style.width = (coords.width + deltaX) + 'px'
          columnWidth.forEach(el => el.style.width = (coords.width + deltaX) + 'px')
        } else if (event.target.dataset.resize === 'row') {
          const deltaY = e.pageY - Math.trunc(coords.bottom)
          $parent.$el.style.height = (coords.height + deltaY) + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
  // onMousemove() {}

  // onMouseup() {}
}