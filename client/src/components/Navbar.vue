<template>
  <div id="nav">
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <img to="/" class="logo" src="../assets/brand-logo.png" alt="">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link to="/">My Library</router-link></b-nav-item>
        <b-nav-item><router-link to="/find">Find Music</router-link></b-nav-item>
        <b-nav-item href="#" @click.prevent="onLogout">Logout</b-nav-item>
      </b-navbar-nav>

      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Navbar",
  methods: {
    ...mapMutations({
      logout: "LOGOUT_USER"
    }),
    async onLogout() {
      await this.logout()
      this.$router.push({name: "Login"})
    }
  }
};
</script>

<style>
.logo {
  width: 105px;
  height: 55px;
  margin:  -10px 0;
}
</style>
