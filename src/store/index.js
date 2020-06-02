import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    id: 5,
    viewIndex: 0
  },
  mutations: {
    initList (state, data) {
      state.list = data
    },
    bindCode (state, data) {
      state.inputValue = data
    },
    addItem (state) {
      const obj = {
        id: state.id,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
      state.id++
    },
    deleteItem (state, flag) {
      const i = state.list.findIndex(x => x.id === flag)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    chooseItem (state, flag) {
      const i = state.list.findIndex(x => x.id === flag)
      if (i !== -1) {
        state.list[i].done = !state.list[i].done
      }
    },
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeStatus (state, flag) {
      state.viewIndex = flag
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(res => {
        context.commit('initList', res.data)
      })
    }
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    handleList (state) {
      if (state.viewIndex === 0) {
        return state.list
      } else if (state.viewIndex === 1) {
        return state.list.filter(x => x.done === false)
      } else if (state.viewIndex === 2) {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})
