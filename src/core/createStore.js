export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(el => el(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(el => el !== fn)
        }
      }
    },
    getState() {
      return state
    }
  }
}