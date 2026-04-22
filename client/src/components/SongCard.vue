<template>
  <div class="song-card">
    <div class="song-card__cover">
      <img :src="item.cover" :alt="item.title" />
      <div class="song-card__cover-overlay">
        <i class="bi bi-play-circle-fill play-icon"></i>
      </div>
      <div class="song-card__title-overlay">
        <div class="song-card__title" :title="item.title">{{ item.title }}</div>
      </div>
    </div>

    <div class="song-card__body">
      <div class="song-card__meta">
        <div class="song-card__artist" :title="item.artist">{{ item.artist }}</div>
        <div class="song-card__duration">
          <i class="bi bi-clock"></i>
          {{ formattedDuration }}
        </div>
      </div>

      <div class="song-card__widget" v-if="showWidget">
        <iframe
          title="deezer-widget"
          :src="item.widget"
          width="100%"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media; clipboard-write"
        ></iframe>
      </div>

      <div class="song-card__actions">
        <button
          class="btn-toggle-widget"
          type="button"
          @click="showWidget = !showWidget"
        >
          <i :class="['bi', showWidget ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
          {{ showWidget ? 'Hide preview' : 'Show preview' }}
        </button>

        <button
          class="btn-add"
          type="button"
          @click.prevent="addFavorite(item)"
          :disabled="isAdding || added"
        >
          <BSpinner v-if="isAdding" small />
          <template v-else-if="added">
            <i class="bi bi-check2"></i>
            Added
          </template>
          <template v-else>
            <i class="bi bi-plus-lg"></i>
            Add to Library
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SongCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAdding: false,
      added: false,
      showWidget: false,
    };
  },
  computed: {
    formattedDuration() {
      const dur = Number(this.item.duration) || 0;
      const m = Math.floor(dur / 60);
      const s = dur % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    },
  },
  methods: {
    ...mapActions(["createFavorite"]),
    async addFavorite(item) {
      this.isAdding = true;
      try {
        await this.createFavorite(item);
        this.added = true;
        this.$toast.success(`Added "${item.title}" to library`);
      } catch (err) {
        const status = err.response && err.response.status;
        if (status === 409) {
          this.added = true;
          this.$toast.info(`"${item.title}" is already in your library`);
        } else {
          this.$toast.error("Failed to add favorite");
        }
      } finally {
        this.isAdding = false;
      }
    },
  },
};
</script>

<style scoped>
.song-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  backdrop-filter: blur(12px);
  height: 100%;
  color: var(--text-primary, #f0f0f0);
}

.song-card:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.25);
}

.song-card__cover {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.song-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.song-card:hover .song-card__cover img {
  transform: scale(1.06);
}

.song-card__cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.song-card:hover .song-card__cover-overlay {
  opacity: 1;
}

.play-icon {
  color: #fff;
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 12px rgba(168, 85, 247, 0.7));
}

.song-card__title-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
  pointer-events: none;
}

.song-card__title {
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-card__body {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.song-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.song-card__artist {
  font-size: 0.85rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.song-card__duration {
  font-size: 0.78rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.55));
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.song-card__widget {
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.song-card__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.btn-toggle-widget {
  align-self: flex-start;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.8rem;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.18s ease;
}

.btn-toggle-widget:hover {
  color: #a855f7;
}

.btn-add {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 999px;
  padding: 9px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn-add:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.55);
}

.btn-add:disabled {
  opacity: 0.85;
  cursor: not-allowed;
}
</style>
