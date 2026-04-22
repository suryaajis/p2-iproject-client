<template>
  <div class="home-page">
    <div class="library-header">
      <div class="library-header__title-row">
        <h4 class="library-title">
          My Library
          <span class="count-badge">{{ favorites.length }}</span>
        </h4>
        <p class="library-subtitle">All your favorite tracks in one place</p>
      </div>
    </div>

    <BAlert v-if="error" :model-value="true" variant="danger" class="error-alert">
      {{ error }}
    </BAlert>

    <div v-if="isLoading" class="state-block">
      <BSpinner variant="light" />
      <p class="state-text">Loading your library...</p>
    </div>

    <div v-else-if="!favorites.length" class="state-block empty-state">
      <i class="bi bi-music-note-list state-icon"></i>
      <p class="state-text">Your library is empty. Find some music!</p>
      <router-link :to="{ name: 'FindFavorite' }" class="empty-cta">
        <i class="bi bi-search"></i>
        Find Music
      </router-link>
    </div>

    <div v-else class="library-grid">
      <div
        v-for="favor in favorites"
        :key="favor.id"
        class="library-grid__col"
      >
        <FavoriteCard :favorite="favor" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FavoriteCard from "../components/FavoriteCard.vue";
export default {
  name: "Home",
  components: { FavoriteCard },
  computed: {
    ...mapState(["favorites", "isLoading", "error"]),
  },
  methods: {
    ...mapActions(["fetchFavorites"]),
  },
  created() {
    this.fetchFavorites();
  },
};
</script>

<style scoped>
.home-page {
  width: 100%;
  padding: 24px 16px 48px;
  color: var(--text-primary, #f0f0f0);
}

.library-header {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(168, 85, 247, 0.08));
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
}

.library-header__title-row {
  text-align: left;
}

.library-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.count-badge {
  background: var(--accent-gradient, linear-gradient(135deg, #7c3aed, #a855f7));
  color: #fff;
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 999px;
  -webkit-text-fill-color: #fff;
}

.library-subtitle {
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.error-alert {
  border-radius: 12px;
}

.state-block {
  text-align: center;
  padding: 56px 16px;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.state-icon {
  color: var(--accent-secondary, #a855f7);
  font-size: 3rem;
  display: inline-block;
  margin-bottom: 12px;
}

.state-text {
  margin-top: 8px;
  font-size: 1rem;
}

.empty-state {
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 16px;
}

.empty-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  background: var(--accent-gradient, linear-gradient(135deg, #7c3aed, #a855f7));
  color: #fff !important;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.empty-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.55);
  text-decoration: none;
}

.library-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 992px) {
  .library-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .library-grid {
    grid-template-columns: 1fr;
  }
}

.library-grid__col {
  animation: fadeUp 0.45s ease both;
}

.library-grid__col:nth-child(2) { animation-delay: 0.05s; }
.library-grid__col:nth-child(3) { animation-delay: 0.1s; }
.library-grid__col:nth-child(4) { animation-delay: 0.15s; }
.library-grid__col:nth-child(5) { animation-delay: 0.2s; }
.library-grid__col:nth-child(6) { animation-delay: 0.25s; }

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
