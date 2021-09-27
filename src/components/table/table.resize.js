import { $ } from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    const type = $resizer.data.resize
    // const sideProp = type === 'col' ? 'height' : 'width'
    let valueX = Math.trunc(coords.width)
    let valueY = Math.trunc(coords.height)
    const typeIdResize = type === 'col' ? 'colNum' : 'row'

    $resizer.css({
      opacity: 1,
      backgroundColor: 'blue'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const deltaX = e.pageX - Math.trunc(coords.right)
        valueX = coords.width + deltaX
        $resizer.css({ right: -deltaX + 'px' })
      } else {
        const deltaY = e.pageY - Math.trunc(coords.bottom) - scrollY
        valueY = coords.height + deltaY
        $resizer.css({
          bottom: -deltaY + 'px'
        })
      }
    }

    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        cells.forEach(el => el.style.width = valueX + 'px')

        $resizer.css({
          opacity: 0,
          right: 0,
          backgroundColor: '#dde6fd'
        })
      } else {
        $parent.css({ height: Math.trunc(valueY) + 'px' })
      }

      resolve({
        value: type === 'col' ?
          Math.trunc(valueX) :
          Math.trunc(valueY),
        type,
        typeIdResize,
        id: type === 'col' ? $parent.data.colNum : $parent.data.row
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        backgroundColor: '#dde6fd'
      })
    }
  })
}