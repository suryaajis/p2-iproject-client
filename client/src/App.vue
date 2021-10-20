<template>
  <div id="app">
    <navbar v-if="isLogin === true"></navbar>
    <div class="bv-example-row">
      <b-row>
        <b-col class="sidebar" cols="2" v-if="isLogin === true"> <sidebar></sidebar></b-col>

        <b-col><router-view /> </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: { Navbar, Sidebar },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapMutations({
      onLogin: "LOGIN_USER"
    }),
  },
  created() {
    if(localStorage.getItem('access_token')) {
      this.onLogin(true)
    }
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Saira", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.selector-for-some-widget {
  box-sizing: content-box;
}
</style>
