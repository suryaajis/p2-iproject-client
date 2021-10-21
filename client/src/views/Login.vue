<template>
  <div class="container login-box">
    <h1 style="margin-bottom:20px;">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group label="Email">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input
          v-model="form.password"
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <div class="btns">
        <b-button type="submit" variant="primary">Login</b-button>

        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with Google
        </g-signin-button>
        <router-link style="color:white;" :to="{ name: 'Register' }"
          >Create new account</router-link
        >
      </div>
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
        client_id:
          "470274448452-rqbe327191hfug0ut4v51t1l3od6nkah.apps.googleusercontent.com",
      },
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
        this.$toast.success("Login Success!");
        this.$router.push({ name: "Home" });
      } else {
        this.$toast.error("Invalid email/password");
      }
    },
    async onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      await this.loginGoogle(id_token);
      if (this.isLogin === true) {
        this.$toast.success("Login Success!");
        this.$router.push({ name: "Home" });
      } else {
        this.$toast.error("Check your connection");
      }
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    },
  },
};
</script>

<style>
.login-box {
  text-align: left;
  margin: auto;
  width: 300px;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 15px rgba(255, 255, 255, 1);
  background-color: transparent;
  color: white;
}

.btns {
  margin-top: 5px;
  text-align: center;
}

.btns button {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  font-weight: bold;
  letter-spacing: 1px;
}

.btns a {
  width: 100%;
  text-decoration: none;
}

.login-box input {
  margin-bottom: 5px;
}

.g-signin-button {
  margin: auto;
  width: 100%;
  height: auto;
  padding: 9px 2px;
  border-radius: 3px;
  color: transparent;
  cursor: pointer;
  background-image: url("https://i.stack.imgur.com/vq3yH.jpg");
  background-size: cover;
  margin-bottom: 5px;
}
</style>
