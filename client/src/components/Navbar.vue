<template>
  <div id="nav">
    <BNavbar toggleable="lg" type="dark" variant="dark">
      <img class="logo" src="../assets/brand-logo.png" alt="" />

      <BNavbarToggle target="nav-collapse"></BNavbarToggle>

      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <BNavItem><router-link to="/">My Library</router-link></BNavItem>
          <BNavItem><router-link to="/find">Find Music</router-link></BNavItem>
          <BNavItem href="#" @click.prevent="onLogout">Logout</BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
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
      this.$router.push({ name: "Login" })
    }
  }
};
</script>

<style>
.logo {
  width: 105px;
  height: 55px;
  margin: -10px 0;
}
</style>
