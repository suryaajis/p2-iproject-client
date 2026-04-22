<template>
  <div class="login-page">
    <div class="login-bg"></div>
    <div class="login-card">
      <div class="brand">
        <i class="bi bi-music-note-beamed brand-icon"></i>
        <h1 class="brand-title">Sun Music</h1>
        <p class="brand-subtitle">Sign in to continue</p>
      </div>

      <form @submit.prevent="onLogin" class="login-form">
        <div class="field">
          <label class="field-label">Email</label>
          <div class="input-wrap">
            <i class="bi bi-envelope-fill input-icon"></i>
            <input
              type="email"
              v-model="form.email"
              class="text-input"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </div>
        </div>

        <div class="field">
          <label class="field-label">Password</label>
          <div class="input-wrap">
            <i class="bi bi-lock-fill input-icon"></i>
            <input
              type="password"
              v-model="form.password"
              class="text-input"
              placeholder="Enter password"
              autocomplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn-primary-grad"
          :disabled="isLoading"
        >
          <BSpinner v-if="isLoading" small />
          <span v-else>Sign In</span>
        </button>

        <div class="divider"><span>or</span></div>

        <div class="google-btn-wrap">
          <GoogleLogin
            v-if="googleClientId"
            :callback="onGoogleCallback"
            prompt
          />
          <p v-else class="google-disabled-note">
            Google sign-in is not configured.
          </p>
        </div>

        <p class="register-link">
          Don't have an account?
          <router-link :to="{ name: 'Register' }">Create one</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { GoogleLogin } from "vue3-google-login";

export default {
  name: "Login",
  components: { GoogleLogin },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapActions(["login", "loginGoogle"]),
    async onLogin() {
      if (!this.form.email || !this.form.password) {
        this.$toast.error("Please enter email and password");
        return;
      }
      this.isLoading = true;
      try {
        await this.login(this.form);
        if (this.isLogin === true) {
          this.$toast.success("Login Success!");
          this.$router.push({ name: "Home" });
        } else {
          this.$toast.error("Invalid email/password");
        }
      } finally {
        this.isLoading = false;
      }
    },
    async onGoogleCallback(response) {
      // vue3-google-login returns { credential } (the ID token JWT) in the default flow
      const idToken = response && response.credential;
      if (!idToken) {
        this.$toast.error("Google sign-in failed");
        return;
      }
      this.isLoading = true;
      try {
        await this.loginGoogle(idToken);
        if (this.isLogin === true) {
          this.$toast.success("Login Success!");
          this.$router.push({ name: "Home" });
        } else {
          this.$toast.error("Check your connection");
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.login-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a0033, #0a0a14, #0d0d2b, #2a0a4d);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: 0;
}

.login-bg::before,
.login-bg::after {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.5;
}

.login-bg::before {
  top: -100px;
  left: -100px;
  background: #7c3aed;
  animation: float1 18s ease-in-out infinite;
}

.login-bg::after {
  bottom: -100px;
  right: -100px;
  background: #a855f7;
  animation: float2 22s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(80px, 60px); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-80px, -60px); }
}

.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 36px 32px;
  background: rgba(15, 15, 30, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
  color: #f0f0f0;
  animation: slideUp 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.brand {
  text-align: center;
  margin-bottom: 24px;
}

.brand-icon {
  color: #a855f7;
  font-size: 2.4rem;
  display: inline-block;
  filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.6));
}

.brand-title {
  margin: 8px 0 4px;
  font-size: 1.9rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
}

.login-form {
  text-align: left;
}

.field {
  margin-bottom: 14px;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.input-wrap {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.45);
}

.text-input {
  width: 100%;
  padding: 11px 14px 11px 42px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.text-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.text-input:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25);
  background: rgba(0, 0, 0, 0.5);
}

.btn-primary-grad {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.45);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn-primary-grad:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.6);
}

.btn-primary-grad:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  margin: 18px 0 12px;
  position: relative;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider::before { left: 0; }
.divider::after { right: 0; }

.divider span {
  background: transparent;
  padding: 0 10px;
}

.google-btn-wrap {
  display: flex;
  justify-content: center;
  min-height: 44px;
}

.google-disabled-note {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

.register-link {
  margin-top: 16px;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
}

.register-link a {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
