const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `<div class="cell" contenteditable></div>`
}

function toColumn(el) {
  return `<div class="column">${el}</div>`
}

function createRow(i, content) {
  return `
    <div class="row">
      <div class="row-info">${i ? i : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i)
}

export function createTable(rowsCount = 10) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 1; i <= rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i, cell))
  }

  return rows.join('')
}