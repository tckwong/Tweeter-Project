import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currUserID: "",
    username: "",
    email: "",
    loginToken: "",
    newTweetContent: "",
  },
  mutations: {
    getcurrUserID(state, data) {
      state.currUserID = data;
    },
    getcurrUserName(state, data) {
      state.username = data;
    },
    getcurrUserEmail(state, data) {
      state.email = data;
    },
    updateToken(state, data) {
      state.loginToken = data;
    },
    getNewTweet(state, data) {
      state.newTweetContent = data;
    }
  },
  actions: {
    getTokenAsync(context, data) {
      context.commit('updateToken', data);
    },
    removeToken(context, data) {
      context.commit('updateToken', data)
    }
  },
  getters: {
  }
})
