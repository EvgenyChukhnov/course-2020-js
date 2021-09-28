const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createRow(i, content, state) {
  const resizer = i ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, i)
  return `
    <div class="row"
    style="height: ${height}"
    data-type="resizable"
    data-row="${i}"
    draggable="false">
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

function toColumn({col, index, width}) {
  return `
    <div class="column"
    style="width: ${width}"
    data-type="resizable"
    data-col="${col}"
    data-col-num="${index + 1}"
    draggable="false">
      ${col}
      <div class="col-resize" data-resize="col" draggable="false"></div>
    </div>
  `
}

function toCell(state, row) {
  return function(_, i) {
    // console.log('state:', state.dataState[`${row}:${i}`])
    const width = getWidth(state.colState, i)
    const idNum = `${i + 1}:${row}`
    const data = state.dataState[idNum] || ''

    return `
      <div class="cell"
        draggable="false"
        style="width: ${width}"
        data-row="${row}"
        data-col="${toChar(row, i)}"
        data-col-num="${i + 1}"
        data-id="${toChar(row, i)}:${row}"
        data-id-num="${idNum}"
        contenteditable>${data}
      </div>
    `
  }
}

function getWidth(state, index) {
  return (state[index + 1] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 10, state = {}) {// rowsAmount (rowsAmt) ???
  const colsCount = CODES.Z - CODES.A + 1 // colsAmt ???
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill(`${row}`)
      .map(toCell(state, row))
      .join('')
    rows.push(createRow(row, cells, state.rowState))
  }

  return rows.join('')
}