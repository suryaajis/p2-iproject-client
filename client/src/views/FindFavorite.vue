<template>
  <div class="find-page">
    <div class="hero">
      <h1 class="hero__title">Find Music</h1>
      <p class="hero__subtitle">Discover new tracks and add them to your library</p>

      <form class="search-form" @submit.prevent="findMusic">
        <div class="search-wrap">
          <i class="bi bi-search search-icon"></i>
          <input
            class="search-input"
            type="text"
            placeholder="Search by artist or title..."
            v-model="query"
          />
        </div>
        <div class="search-actions">
          <button type="submit" class="btn-grad" :disabled="isLoading">
            <BSpinner v-if="isLoading" small />
            <span v-else>Search</span>
          </button>
          <button type="button" class="btn-ghost" @click.prevent="clear">Reset</button>
        </div>
      </form>
    </div>

    <div class="results-section">
      <BAlert v-if="error" :model-value="true" variant="danger" class="error-alert">
        {{ error }}
      </BAlert>

      <div v-if="isLoading" class="state-block">
        <BSpinner variant="light" />
        <p class="state-text">Searching for music...</p>
      </div>

      <div
        v-else-if="hasSearched && searchItems.length === 0"
        class="state-block"
      >
        <i class="bi bi-emoji-frown state-icon"></i>
        <p class="state-text">No results found. Try a different search.</p>
      </div>

      <div v-else class="results-grid">
        <div
          v-for="song in searchItems"
          :key="song.id"
          class="results-grid__col"
        >
          <SongCard :item="song" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import SongCard from "../components/SongCard.vue";
export default {
  components: { SongCard },
  name: "FindFavorite",
  data() {
    return {
      query: "",
      hasSearched: false,
    };
  },
  computed: {
    ...mapState(["searchItems", "isLoading", "error"]),
  },
  methods: {
    ...mapActions(["findMusicDeezer"]),
    ...mapMutations({
      clearSearch: "SEARCH_ITEM",
    }),
    async findMusic() {
      if (this.query !== "") {
        this.hasSearched = true;
        await this.findMusicDeezer(this.query);
      } else {
        this.clearSearch([]);
        this.hasSearched = false;
      }
    },
    clear() {
      this.query = "";
      this.clearSearch([]);
      this.hasSearched = false;
    },
  },
};
</script>

<style scoped>
.find-page {
  width: 100%;
  padding: 24px 16px 48px;
  color: var(--text-primary, #f0f0f0);
}

.hero {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(168, 85, 247, 0.1));
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
}

.hero__title {
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  margin-top: 6px;
  font-size: 0.95rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  margin-bottom: 24px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
}

.search-wrap {
  position: relative;
  flex: 1 1 320px;
  min-width: 240px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 999px;
  background: rgba(15, 15, 30, 0.8);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  color: var(--text-primary, #f0f0f0);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.25s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input:focus {
  border-color: var(--accent-color, #7c3aed);
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.25), 0 0 20px rgba(124, 58, 237, 0.35);
  background: rgba(15, 15, 30, 0.95);
}

.search-actions {
  display: flex;
  gap: 8px;
}

.btn-grad {
  background: var(--accent-gradient, linear-gradient(135deg, #7c3aed, #a855f7));
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 999px;
  padding: 10px 22px;
  min-width: 100px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-grad:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.55);
}

.btn-grad:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  color: var(--text-primary, #f0f0f0);
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
}

.results-section {
  max-width: 1200px;
  margin: 0 auto;
}

.error-alert {
  border-radius: 12px;
}

.state-block {
  text-align: center;
  padding: 48px 16px;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.state-icon {
  color: var(--accent-secondary, #a855f7);
  font-size: 3rem;
  display: inline-block;
  margin-bottom: 8px;
}

.state-text {
  margin-top: 12px;
  font-size: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 992px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}

.results-grid__col {
  animation: fadeUp 0.45s ease both;
}

.results-grid__col:nth-child(2) { animation-delay: 0.05s; }
.results-grid__col:nth-child(3) { animation-delay: 0.1s; }
.results-grid__col:nth-child(4) { animation-delay: 0.15s; }
.results-grid__col:nth-child(5) { animation-delay: 0.2s; }
.results-grid__col:nth-child(6) { animation-delay: 0.25s; }

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
