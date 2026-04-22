<template>
  <div class="register-page">
    <div class="register-bg"></div>
    <div class="register-card">
      <div class="brand">
        <i class="bi bi-music-note-beamed brand-icon"></i>
        <h1 class="brand-title">Create Account</h1>
        <p class="brand-subtitle">Join Sun Music and start discovering</p>
      </div>

      <div class="progress-wrap" :title="`${progress}% complete`">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="progress-label">{{ progress }}% complete</p>

      <form @submit.prevent="onRegister" @reset.prevent="onReset" class="register-form">
        <div class="form-row">
          <div class="field">
            <label class="field-label">Full Name</label>
            <div class="input-wrap">
              <i class="bi bi-person-fill input-icon"></i>
              <input
                type="text"
                v-model="form.fullName"
                class="text-input"
                placeholder="Your full name"
              />
            </div>
          </div>
          <div class="field">
            <label class="field-label">Email</label>
            <div class="input-wrap">
              <i class="bi bi-envelope-fill input-icon"></i>
              <input
                type="email"
                v-model="form.email"
                class="text-input"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="field">
            <label class="field-label">Password</label>
            <div class="input-wrap">
              <i class="bi bi-lock-fill input-icon"></i>
              <input
                type="password"
                v-model="form.password"
                class="text-input"
                placeholder="Min. 6 characters"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="field-label">Phone</label>
            <div class="input-wrap">
              <i class="bi bi-telephone-fill input-icon"></i>
              <input
                type="text"
                v-model="form.phone"
                class="text-input"
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>

        <div class="field">
          <label class="field-label">Address</label>
          <div class="input-wrap">
            <i class="bi bi-geo-alt-fill input-icon"></i>
            <input
              type="text"
              v-model="form.address"
              class="text-input"
              placeholder="Your address"
            />
          </div>
        </div>

        <div class="actions">
          <button
            type="submit"
            class="btn-primary-grad"
            :disabled="isLoading"
          >
            <BSpinner v-if="isLoading" small />
            <span v-else>Register</span>
          </button>
          <button type="reset" class="btn-ghost" :disabled="isLoading">Reset</button>
        </div>

        <p class="login-link">
          Already have an account?
          <router-link :to="{ name: 'Login' }">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["isRegister"]),
    progress() {
      const total = Object.keys(this.form).length;
      const filled = Object.values(this.form).filter(
        (v) => v && v.toString().trim().length
      ).length;
      return Math.round((filled / total) * 100);
    },
  },
  methods: {
    ...mapActions(["register"]),
    async onRegister() {
      if (!this.form.email || !this.form.password) {
        this.$toast.error("Email and password are required");
        return;
      }
      if (this.form.password.length < 6) {
        this.$toast.error("Password must be at least 6 characters");
        return;
      }
      this.isLoading = true;
      try {
        await this.register(this.form);
        if (this.isRegister === true) {
          this.$toast.success("Registration successful! Please log in.");
          this.$router.push({ name: "Login" });
        } else {
          this.$toast.error("Please fill all required fields correctly");
        }
      } finally {
        this.isLoading = false;
      }
    },
    onReset() {
      this.form.email = "";
      this.form.fullName = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.address = "";
    },
  },
};
</script>

<style scoped>
.register-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 1;
  padding: 24px 16px;
}

.register-bg {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #1a0033, #0a0a14, #0d0d2b, #2a0a4d);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: 0;
}

.register-bg::before,
.register-bg::after {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.5;
}

.register-bg::before {
  top: -100px;
  left: -100px;
  background: #7c3aed;
  animation: float1 18s ease-in-out infinite;
}

.register-bg::after {
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

.register-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
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
  margin-bottom: 16px;
}

.brand-icon {
  color: #a855f7;
  font-size: 2.4rem;
  display: inline-block;
  filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.6));
}

.brand-title {
  margin: 8px 0 4px;
  font-size: 1.7rem;
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

.progress-wrap {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  height: 6px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  transition: width 0.3s ease;
}

.progress-label {
  margin: 6px 0 18px;
  text-align: right;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.register-form {
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 575px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.field {
  margin-bottom: 12px;
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

.actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-primary-grad {
  flex: 1;
  padding: 12px;
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

.btn-ghost {
  padding: 12px 22px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.btn-ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
}

.login-link {
  margin-top: 16px;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
}

.login-link a {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
