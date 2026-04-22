<template>
  <div id="sidebar">
    <div class="sidebar-user">
      <div class="avatar-wrap">
        <img v-if="user.imgUrl" :src="user.imgUrl" alt="avatar" class="avatar" />
        <div v-else class="avatar-fallback">{{ initials }}</div>
      </div>
      <div class="user-info">
        <div class="user-name" :title="user.fullName">{{ user.fullName || 'Guest' }}</div>
        <div class="user-email" :title="user.email">{{ user.email || '' }}</div>
      </div>
    </div>

    <hr class="divider" />

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item">
        <i class="bi bi-music-note-list nav-icon"></i>
        <span>My Library</span>
      </router-link>
      <router-link to="/find" class="nav-item">
        <i class="bi bi-search nav-icon"></i>
        <span>Find Music</span>
      </router-link>
      <a href="#" class="nav-item nav-logout" @click.prevent="onLogout">
        <i class="bi bi-box-arrow-right nav-icon"></i>
        <span>Logout</span>
      </a>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapState(["user"]),
    initials() {
      const name =
        this.user && this.user.fullName
          ? this.user.fullName
          : this.user && this.user.email
          ? this.user.email
          : "?";
      return name
        .split(" ")
        .map((s) => s[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    ...mapActions(["userDetail"]),
    ...mapMutations({
      logout: "LOGOUT_USER",
    }),
    async onLogout() {
      await this.logout();
      this.$router.push({ name: "Login" });
      this.$toast.success("Logout Success!");
    },
  },
  created() {
    this.userDetail();
  },
};
</script>

<style scoped>
#sidebar {
  background: rgba(15, 15, 30, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
}

.sidebar-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.avatar-wrap {
  position: relative;
  width: 72px;
  height: 72px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 3px var(--accent-color, #7c3aed), 0 0 20px rgba(124, 58, 237, 0.45);
}

.avatar-fallback {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 0 0 3px var(--accent-color, #7c3aed), 0 0 20px rgba(124, 58, 237, 0.45);
}

.user-info {
  width: 100%;
  min-width: 0;
}

.user-name {
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 18px 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  text-decoration: none;
}

.nav-item .nav-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.nav-item.router-link-exact-active {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.45);
}

.nav-logout {
  margin-top: 4px;
  color: #f87171;
}

.nav-logout:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}
</style>
