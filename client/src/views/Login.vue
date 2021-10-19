<template>
  <div class="container login-box">
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
      <p>
        You don't have an account yet?
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </p>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >
        Sign in with Google
      </g-signin-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      googleSignInParams: {
        client_id: '470274448452-gb7j62pflkrr9768bbuvv1p6b18b2skv.apps.googleusercontent.com'
      }
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapActions(["login", "loginGoogle"]),
    async onLogin() {
      await this.login(this.form);
      if (this.isLogin === true) {
        this.$router.push({ name: "Home" });
      }
    },
    async onSignInSuccess (googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      await this.loginGoogle(id_token)
      if (this.isLogin === true) {
        this.$router.push({ name: "Home" });
      }
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  },
};
</script>

<style>
.login-box {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.login-box button {
  margin-top: 15px;
  margin-right: 5px;
}

.login-box input {
  margin-bottom: 5px;
}

.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>
