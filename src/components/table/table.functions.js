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