export function capitalize(string) {
  if (typeof string !== 'string') return ''

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start === end) {
    return [start]
  } else if (start > end) [start, end] = [end, start]
  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}