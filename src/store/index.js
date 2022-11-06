import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    historyArr:[],
    isExit: []
  },
  getters: {
  },
  mutations: {
    getHistory(state,bookData) {
      console.log(state.isExit.indexOf(bookData.id) == -1);
      if (state.isExit.indexOf(bookData.id) == -1) {
        state.isExit = [bookData.id,...state.isExit]
        state.historyArr = [{
           id:bookData.id,
           title:bookData.title,
           author:bookData.author,
           bookType:bookData.booktype,
           time: new Date().getTime()
       },...state.historyArr]
       console.log(state.historyArr);
      } else {
        state.historyArr.splice(state.isExit.indexOf(bookData.id),1)
        state.isExit.splice(state.isExit.indexOf(bookData.id),1)
        state.isExit = [bookData.id,...state.isExit]
        state.historyArr = [{
           id:bookData.id,
           title:bookData.title,
           author:bookData.author,
           bookType:bookData.booktype,
           time: new Date().getTime()
       },...state.historyArr]
        console.log(state.historyArr);
      }
    },
    empty(state) {
      state.isExit = []
      state.historyArr = []
    }
  },
  actions: {
  },
  modules: {
  }
})
