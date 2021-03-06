import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currUserID: "",
    username: "",
    email: "",
    loginToken: "",
  },
  mutations: {  
    getcurrUserID(state, data) {
      state.currUserID = data;
    },
    getcurrUserName(state, data) {
      state.username = data;
    },
  },
  
  getters: {
  }
})
