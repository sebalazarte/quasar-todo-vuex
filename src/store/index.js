import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import todo from './todo'
import auth from './auth'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      todo,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
