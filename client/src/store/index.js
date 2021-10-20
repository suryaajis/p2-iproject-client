import Vue from "vue";
import Vuex from "vuex";
import axios from "../apis/server";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isRegister: false,
    searchItems: [],
    favorites: [],
  },
  mutations: {
    REGISTER_USER(state, payload) {
      state.isRegister = payload;
    },
    LOGIN_USER(state, payload) {
      state.isLogin = payload;
    },
    LOGOUT_USER(state) {
      localStorage.clear();
      state.isLogin = false;
    },
    SEARCH_ITEM(state, payload) {
      state.searchItems = payload;
    },
    FETCH_FAVORITES(state, payload) {
      state.favorites = payload;
    },
  },
  actions: {
    async register(context, payload) {
      try {
        await axios({
          url: "/register",
          method: "POST",
          data: payload,
        });

        context.commit("REGISTER_USER", true);
        console.log("Register Success");
      } catch (err) {
        context.commit("REGISTER_USER", false);
        console.log(err.response.data);
      }
    },

    async login(context, payload) {
      try {
        const { data } = await axios({
          url: "/login",
          method: "POST",
          data: payload,
        });

        
        localStorage.setItem("access_token", data.access_token);
        context.commit("LOGIN_USER", true);
        console.log("Login Success");
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async loginGoogle(context, payload) {
      try {
        const { data } = await axios({
          url: "/loginGoogle",
          method: "POST",
          data: {
            token: payload,
          },
        });

        localStorage.setItem("access_token", data.access_token);
        context.commit("LOGIN_USER", true);
        console.log("Login Success");
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async findMusicDeezer(context, payload) {
      try {
        let mainUrl = "/music/search?";

        if (payload) {
          mainUrl += `q=${payload}`;
        }

        const response = await axios({
          url: mainUrl,
          method: "GET",
          headers: {
            access_token: localStorage.access_token,
          },
        });

        console.log(response.data);
        context.commit("SEARCH_ITEM", response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async fetchFavorites(context) {
      try {
        const { data } = await axios({
          url: "/music/favorites",
          method: "GET",
          headers: {
            access_token: localStorage.access_token,
          },
        });

        context.commit("FETCH_FAVORITES", data);
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },
  modules: {},
});
