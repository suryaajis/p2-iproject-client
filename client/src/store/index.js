import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isRegister: false
  },
  mutations: {
    REGISTER_USER(state, payload) {
      state.isRegister = payload
    },
    LOGIN_USER(state, payload) {
      localStorage.setItem('access_token', payload)
      state.isLogin = true
    },
    LOGOUT_USER(state) {
      localStorage.clear()
      state.isLogin = false
    }
  },
  actions: {
    async register(context, payload) {
      try {
        await axios({
          url: "/register",
          method: "POST",
          data: payload
        })

        context.commit("REGISTER_USER", true)
        console.log('Register Success')
      } catch (err) {
        context.commit("REGISTER_USER", false)
        console.log(err.response.data)
      }
    },

    async login(context, payload) {
      try {
        const { data } = await axios({
          url: "/login",
          method: "POST",
          data: payload
        })

        context.commit("LOGIN_USER", data.access_token)
        console.log('Login Success')
      } catch (err) {
        console.log(err.response.data)
      }
    },
    
    async loginGoogle(context, payload) {
      try {
        const { data } = await axios({
          url: "/loginGoogle",
          method: "POST",
          data: {
            token: payload
          }
        })

        context.commit("LOGIN_USER", data.access_token)
        console.log('Login Success')
      } catch (err) {
        console.log(err.response.data)
      }
    }
  },
  modules: {
  }
})
