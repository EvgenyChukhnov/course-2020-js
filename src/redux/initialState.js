import {storage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '' // текущий текст, который введён
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState