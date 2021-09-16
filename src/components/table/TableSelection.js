export class TableSelection {
  static classNameSelected = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.classNameSelected)
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach(el => el.removeClass(TableSelection.classNameSelected))
    this.group = []
  }

  selectCtrl($el) {
    this.group.push($el)
    $el.addClass(TableSelection.classNameSelected)
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.classNameSelected))
  }
}