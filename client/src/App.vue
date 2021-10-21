<template>
  <div id="app" class="overlay">
    <b-container v-if="isLogin === true" id="home" class="bv-example-row">
      <b-row class="text-center full-height">
        <b-col cols="2" v-if="isLogin === true"
          ><sidebar class="sdbar"></sidebar
        ></b-col>
        <b-col style="overflow:auto;">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
    <b-container class="bv-example-row" v-if="isLogin === false">
      <b-row class="text-center full-height">
        <b-col cols="2" v-if="isLogin === true"
          ><sidebar class="sdbar"></sidebar
        ></b-col>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
    <HFooter id="footer"></HFooter>
  </div>
</template>

<script>
import HFooter from "vue-hacktiv8-footer";
import { mapState, mapMutations } from "vuex";
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: { Sidebar, HFooter },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapMutations({
      onLogin: "LOGIN_USER",
    }),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.onLogin(true);
    }
  },
};
</script>

<style>
h1,
h2,
h3,
h4,
h5,
.sdbar {
  font-family: "Saira", sans-serif;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("./assets/dj2.jpg");
  height: 100%;
  padding-top: 5%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#home {
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  height: 85%;
  overflow: hidden;
}

#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #212529;
}

.sdbar a.router-link-exact-active {
  color: #f0a500;
}

.selector-for-some-widget {
  box-sizing: content-box;
}

.sdbar {
  margin-left: -12px;
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.player {
  background-color: grey;
  border-radius: 0px 0px 10px 10px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px; */
}

.icons {
  margin-right: 20px;
  cursor: pointer;
}
</style>
