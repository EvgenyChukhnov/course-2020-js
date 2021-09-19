import { range } from '@core/utils';

export function shouldReszie(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.idNum
}

export function multiplySelectCells($target, $current) {
  const target = $target.idNum(true)
  const current = $current.idNum(true)

  const colsRange = range(current.col, target.col)
  const rowsRange = range(current.row, target.row)

  return colsRange.reduce((acc, col) => {
    rowsRange.forEach(row => acc.push(`${col}:${row}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  // const MIN_VALUE = 1
  // const MAX_VALUE = 20
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      if (row >= 0 && (document.querySelector(`[data-row="${row + 1}"]`))) row++
      break
    case 'Tab':
    case 'ArrowRight':
      if (col >= 0 && (document.querySelector(`[data-col-num="${col + 1}"]`)) ) col++
      break
    case 'ArrowLeft':
      if (col > 1) col--
      break
    case 'ArrowUp':
      if (row > 1) row--
      break
    // case 'Shift':
    // case 'Control':
  }

  return `[data-id-num="${col}:${row}"]`
}