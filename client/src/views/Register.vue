<template>
  <div class="container register-box">
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group id="input-group-2" label="Full Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.fullName"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

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
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Phone:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.phone"
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Address:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.address"
          placeholder="Enter address"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <p>You have an account? <router-link :to="{name: 'Login'}">Login</router-link></p>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Register",
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapState(['isRegister'])
  },
  methods: {
    ...mapActions(['register']),
    async onRegister() {
      await this.register(this.form)
      if(this.isRegister === true) {
        this.$router.push({name: "Login"})
      }
    },
    onReset() {
      this.form.email = "";
      this.form.fullName = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.address = ""
    },
  },
};
</script>

<style>
.register-box {
  margin-top: 30px;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
}

.register-box button {
  margin-top: 15px;
  margin-right: 5px;
}

.register-box input {
  margin-bottom: 5px;
}
</style>
