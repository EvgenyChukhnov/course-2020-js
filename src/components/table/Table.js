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
      const $resizer = $(event.target) // DOM-object $el: (<div.row(col)-resizer>)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $resizer.data.resize
      // const sideProp = type === 'col' ? 'height' : 'width'
      let valueX
      let valueY

      $resizer.css({opacity: 1})

      if (type === 'col') {
        $resizer.css({
          height: '100vh'
        })
      } else {
        $resizer.css({
          width: 100 + 'vw'
        })
      }

      document.onmousemove = e => {
        if (type === 'col') {
          const deltaX = e.pageX - Math.trunc(coords.right)
          valueX = coords.width + deltaX
          $resizer.css({right: -deltaX + 'px'})
        } else {
          const deltaY = e.pageY - Math.trunc(coords.bottom)
          valueY = coords.height + deltaY - scrollY
          $resizer.css({bottom: -deltaY + 'px'})
        }
      }

      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
          cells.forEach(el => el.style.width = valueX + 'px')
          $resizer.css({
            opacity: 0,
            height: 24 + 'px',
            right: 0
          })
        } else {
          $parent.css({height: Math.trunc(valueY) + 'px'})
          $resizer.css({
            opacity: 0,
            bottom: 0,
            width: 38 + 'px'
          })
        }
      }
    }
  }
  // onMousemove() {}

  // onMouseup() {}
}