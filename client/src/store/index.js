import { createStore } from "vuex";
import axios from "../apis/server";

export default createStore({
  state: {
    isLogin: false,
    isRegister: false,
    searchItems: [],
    favorites: [],
    user: {},
    isLoading: false,
    error: null,
    currentSong: null,
    isPlaying: false,
    songIndex: 0,
    showLyrics: false,
    audioCurrentTime: 0,
    audioDuration: 0
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
      state.user = {};
      state.favorites = [];
      state.searchItems = [];
      state.currentSong = null;
      state.isPlaying = false;
      state.songIndex = 0;
      state.showLyrics = false;
      state.audioCurrentTime = 0;
      state.audioDuration = 0;
    },
    SEARCH_ITEM(state, payload) {
      state.searchItems = payload;
    },
    FETCH_FAVORITES(state, payload) {
      state.favorites = payload;
    },
    GET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, val) {
      state.isLoading = val;
    },
    SET_ERROR(state, val) {
      state.error = val;
    },
    SET_CURRENT_SONG(state, song) {
      state.currentSong = song;
    },
    SET_IS_PLAYING(state, val) {
      state.isPlaying = val;
    },
    SET_SONG_INDEX(state, idx) {
      state.songIndex = idx;
    },
    SET_SHOW_LYRICS(state, val) {
      state.showLyrics = val;
    },
    SET_AUDIO_PROGRESS(state, { currentTime, duration }) {
      state.audioCurrentTime = currentTime;
      state.audioDuration = duration;
    },
    UPDATE_FAVORITE_STATUS(state, favorite) {
      const idx = state.favorites.findIndex(f => f.id === favorite.id);
      if (idx !== -1) state.favorites[idx].status = favorite.status;
    },
    REMOVE_FAVORITE(state, id) {
      state.favorites = state.favorites.filter(f => f.id !== id);
    }
  },
  actions: {
    async register(context, payload) {
      try {
        context.commit("SET_LOADING", true);
        context.commit("SET_ERROR", null);
        await axios({
          url: "/register",
          method: "POST",
          data: payload
        });

        context.commit("REGISTER_USER", true);
      } catch (err) {
        context.commit("REGISTER_USER", false);
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Registration failed";
        context.commit("SET_ERROR", message);
      } finally {
        context.commit("SET_LOADING", false);
      }
    },

    async login(context, payload) {
      try {
        context.commit("SET_LOADING", true);
        context.commit("SET_ERROR", null);
        const { data } = await axios({
          url: "/login",
          method: "POST",
          data: payload
        });

        localStorage.setItem("access_token", data.access_token);
        context.commit("LOGIN_USER", true);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Login failed";
        context.commit("SET_ERROR", message);
      } finally {
        context.commit("SET_LOADING", false);
      }
    },

    async loginGoogle(context, payload) {
      try {
        context.commit("SET_LOADING", true);
        context.commit("SET_ERROR", null);
        const { data } = await axios({
          url: "/loginGoogle",
          method: "POST",
          data: {
            token: payload
          }
        });

        localStorage.setItem("access_token", data.access_token);
        context.commit("LOGIN_USER", true);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Google login failed";
        context.commit("SET_ERROR", message);
      } finally {
        context.commit("SET_LOADING", false);
      }
    },

    async findMusicDeezer(context, payload) {
      try {
        context.commit("SET_LOADING", true);
        context.commit("SET_ERROR", null);
        let mainUrl = "/music/search?";

        if (payload) {
          mainUrl += `q=${payload}`;
        }

        const response = await axios({
          url: mainUrl,
          method: "GET"
        });

        context.commit("SEARCH_ITEM", response.data.data);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Search failed";
        context.commit("SET_ERROR", message);
      } finally {
        context.commit("SET_LOADING", false);
      }
    },

    async fetchFavorites(context) {
      try {
        context.commit("SET_LOADING", true);
        context.commit("SET_ERROR", null);
        const { data } = await axios({
          url: "/music/favorites",
          method: "GET"
        });

        context.commit("FETCH_FAVORITES", data);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to load favorites";
        context.commit("SET_ERROR", message);
      } finally {
        context.commit("SET_LOADING", false);
      }
    },

    async createFavorite(context, payload) {
      try {
        context.commit("SET_ERROR", null);
        let song = {
          title: payload.title,
          duration: payload.duration,
          artist: payload.artist,
          cover: payload.cover,
          songUrl: payload.preview,
          fullSongUrl: payload.link
        };

        const { data } = await axios({
          url: "/music",
          method: "POST",
          data: song
        });

        await axios({
          url: "/music/favorites/" + data.id,
          method: "POST"
        });

        await context.dispatch("fetchFavorites");
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to add favorite";
        context.commit("SET_ERROR", message);
        throw err;
      }
    },

    async deleteFavorite(context, payload) {
      // Optimistic update — remove first, restore on error
      context.commit("REMOVE_FAVORITE", payload);
      try {
        await axios({
          url: "/music/favorites/" + payload,
          method: "DELETE"
        });
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to delete favorite";
        context.commit("SET_ERROR", message);
        await context.dispatch("fetchFavorites");
        throw err;
      }
    },

    async changeStatusFavorite(context, payload) {
      try {
        context.commit("SET_ERROR", null);
        const response = await axios({
          url: "/music/favorites/" + payload.favoriteId,
          method: "PATCH",
          data: {
            status: payload.status
          }
        });

        context.commit("UPDATE_FAVORITE_STATUS", response.data.favorite);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to update status";
        context.commit("SET_ERROR", message);
        throw err;
      }
    },

    async userDetail(context) {
      try {
        const { data } = await axios({
          url: "/user",
          method: "GET"
        });

        context.commit("GET_USER", data);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to load user";
        context.commit("SET_ERROR", message);
      }
    },

    toggleLyrics({ commit, state }) {
      commit('SET_SHOW_LYRICS', !state.showLyrics);
    },
    playTrack({ commit, state }, song) {
      const idx = state.favorites.findIndex(f => f.Song && f.Song.id === song.id);
      if (idx !== -1) commit('SET_SONG_INDEX', idx);
      commit('SET_CURRENT_SONG', song);
      commit('SET_IS_PLAYING', true);
    },
    togglePlay({ commit, state }) {
      commit('SET_IS_PLAYING', !state.isPlaying);
    },
    nextTrack({ commit, state }) {
      if (!state.favorites.length) return;
      let next = (state.songIndex + 1) % state.favorites.length;
      const song = state.favorites[next] && state.favorites[next].Song;
      if (song) {
        commit('SET_SONG_INDEX', next);
        commit('SET_CURRENT_SONG', song);
        commit('SET_IS_PLAYING', true);
      }
    },
    prevTrack({ commit, state }) {
      if (!state.favorites.length) return;
      let prev = state.songIndex - 1;
      if (prev < 0) prev = state.favorites.length - 1;
      const song = state.favorites[prev] && state.favorites[prev].Song;
      if (song) {
        commit('SET_SONG_INDEX', prev);
        commit('SET_CURRENT_SONG', song);
        commit('SET_IS_PLAYING', true);
      }
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    user: state => state.user,
    searchItems: state => state.searchItems,
    favorites: state => state.favorites,
    isLoading: state => state.isLoading,
    error: state => state.error,
    currentSong: state => state.currentSong,
    isPlaying: state => state.isPlaying
  },
  modules: {}
});
