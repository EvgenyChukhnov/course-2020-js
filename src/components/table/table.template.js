const CODES = {
  A: 65,
  Z: 90
}

function createRow(i, content) {
  const resizer = i ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${i}" draggable="false">
      <div class="row-info" draggable="false">
        ${i ? i : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i)
}

function toColumn(el) {
  return `
    <div class="column"
    data-type="resizable"
    data-col="${el}"
    draggable="false">
      ${el}
      <div class="col-resize" data-resize="col" draggable="false"></div>
    </div>
  `
}

function toCell(row, i) {
  return `
    <div class="cell"
        draggable="false"
        data-row="${row}"
        data-col="${toChar(row, i)}"
        data-col-num="${i + 1}"
        data-id="${toChar(row, i)}:${row}"
        data-id-num="${i + 1}:${row}"
        contenteditable>
    </div>
  `
}

export function createTable(rowsCount = 10) {// rowsAmount (rowsAmt) ???
  const colsCount = CODES.Z - CODES.A + 1 // colsAmt ???
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 1; row <= rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill(`${row}`)
        .map(toCell)
        .join('')
    rows.push(createRow(row, cell))
  }

  return rows.join('')
}