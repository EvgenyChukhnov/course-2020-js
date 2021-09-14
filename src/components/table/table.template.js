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

function toCell(el, i,) {
  return `
    <div class="cell"
        draggable="false"
        data-row="${el}"
        data-col="${toChar(el, i)}"
        contenteditable>
    </div>
  `
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
        .fill(`${i}`)
        .map(toCell)
        .join('')
    rows.push(createRow(i, cell))
  }

  return rows.join('')
}