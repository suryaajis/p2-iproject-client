<template>
  <div id="sidebar">
    <b-list-group>
      <b-list-group-item style="background-color:#212529;color:#fff;">
        <img :src="user.imgUrl" alt="" class="avatar" />
        <h6 class="account">{{ user.email }}<br>{{ user.fullName }}</h6>
      </b-list-group-item>
      <hr />
      <b-list-group-item
        style="background-color:#212529;color:#fff;text-decoration:none;"
        ><router-link to="/" class="list">My Library</router-link></b-list-group-item
      >
      <b-list-group-item
        class="list"
        style="background-color:#212529;color:#fff;text-decoration:none;"
        ><router-link to="/find" class="list">Find Music</router-link></b-list-group-item
      >
      <b-list-group-item
        class="list"
        style="background-color:#212529;color:#fff;text-decoration:none;"
        @click.prevent="onLogout"
        ><a href="" class="list">Logout</a></b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["userDetail"]),
    ...mapMutations({
      logout: "LOGOUT_USER",
    }),
    async onLogout() {
      await this.logout();
      this.$router.push({ name: "Login" });
      this.$toast.success('Logout Success!')
    },
  },
  created() {
    this.userDetail();
  },
};
</script>

<style>
#sidebar {
  background-color: #212529;
  color: #fff;
  width: 120%;
  height: 100%;
  font-weight: bold;
}

.list {
  background-color: #212529;
  color: #fff;
  text-decoration: none;
}

.list a {
  color: #fff;
  text-decoration: none;
}

.list:hover {
  text-decoration: none;
  color: grey;
}

.avatar {
  margin-top: 5px;
  border-radius: 50%;
  border: 0.5px solid white;
  margin-bottom: 10px;
}

.account {
  color: rgb(167, 167, 167);
  font-style: italic;
  font-weight: bold;
  margin-bottom: -10px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
}
</style>
