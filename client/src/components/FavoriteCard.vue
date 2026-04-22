<template>
  <div class="fav-card" :class="{ 'is-playing': isCurrentSong }">
    <div class="fav-card__art">
      <img :src="favorite.Song.cover" :alt="favorite.Song.title" />
      <div class="fav-card__play-overlay">
        <button
          @click="onPlay"
          class="play-btn"
          type="button"
          :aria-label="isCurrentSong && isPlaying ? 'Pause' : 'Play'"
        >
          <i :class="['bi', isCurrentSong && isPlaying ? 'bi-pause-fill' : 'bi-play-fill']"></i>
        </button>
      </div>
    </div>

    <div class="fav-card__info">
      <div class="fav-card__title-row">
        <span class="playing-indicator" v-if="isCurrentSong && isPlaying"></span>
        <div class="fav-card__title" :title="favorite.Song.title">
          {{ favorite.Song.title }}
        </div>
      </div>
      <div class="fav-card__artist" :title="favorite.Song.artist">
        {{ favorite.Song.artist }}
      </div>

      <div class="fav-card__actions">
        <span class="status-badge" :class="statusClass">{{ selected }}</span>

        <select
          class="status-select"
          v-model="selected"
          @change="changeStatus(selected)"
          :disabled="isUpdating"
        >
          <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
        </select>

        <button
          class="delete-btn"
          type="button"
          @click.prevent="onDeleteFavorite(favorite.id)"
          :disabled="isDeleting"
          aria-label="Delete favorite"
        >
          <BSpinner v-if="isDeleting" small />
          <i v-else class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FavoriteCard",
  props: {
    favorite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: this.favorite.status || "Neutral",
      options: ["Good", "Neutral", "Bad"],
      isDeleting: false,
      isUpdating: false,
    };
  },
  computed: {
    ...mapState(["currentSong", "isPlaying"]),
    isCurrentSong() {
      return (
        this.currentSong &&
        this.favorite.Song &&
        this.currentSong.id === this.favorite.Song.id
      );
    },
    statusClass() {
      if (this.selected === "Good") return "status-good";
      if (this.selected === "Bad") return "status-bad";
      return "status-neutral";
    },
  },
  watch: {
    "favorite.status"(newVal) {
      this.selected = newVal || "Neutral";
    },
  },
  methods: {
    ...mapActions([
      "deleteFavorite",
      "fetchFavorites",
      "changeStatusFavorite",
      "playTrack",
      "togglePlay",
    ]),
    async onDeleteFavorite(favoriteId) {
      const confirmed = window.confirm(
        "Are you sure you want to remove this song from your library?"
      );
      if (!confirmed) return;

      this.isDeleting = true;
      try {
        await this.deleteFavorite(favoriteId);
        this.$toast.success("Removed from library");
      } catch (err) {
        this.$toast.error("Failed to delete favorite");
      } finally {
        this.isDeleting = false;
      }
    },
    async changeStatus(status) {
      this.isUpdating = true;
      try {
        await this.changeStatusFavorite({
          status,
          favoriteId: this.favorite.id,
        });
        this.$toast.success("Status updated");
      } catch (err) {
        this.$toast.error("Failed to update status");
        this.selected = this.favorite.status || "Neutral";
      } finally {
        this.isUpdating = false;
      }
    },
    onPlay() {
      if (this.isCurrentSong) {
        this.togglePlay();
      } else {
        this.playTrack(this.favorite.Song);
      }
    },
  },
};
</script>

<style scoped>
.fav-card {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  animation: cardIn 0.4s ease both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.fav-card:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.25);
}

.fav-card.is-playing {
  border-color: rgba(34, 197, 94, 0.55);
  box-shadow: 0 0 0 1px rgba(34, 197, 94, 0.4), 0 8px 24px rgba(34, 197, 94, 0.18);
}

.fav-card__art {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.fav-card__art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fav-card__play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.fav-card:hover .fav-card__play-overlay,
.fav-card.is-playing .fav-card__play-overlay {
  opacity: 1;
}

.play-btn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 999px;
  color: #fff;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.55);
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.18s ease;
}

.play-btn:hover {
  transform: scale(1.08);
}

.fav-card__info {
  flex: 1 1 auto;
  min-width: 0;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text-primary, #f0f0f0);
}

.fav-card__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fav-card__title {
  font-weight: 600;
  font-size: 0.98rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.fav-card__artist {
  font-size: 0.82rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.55));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.fav-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 9px;
  border-radius: 999px;
}

.status-good {
  background: rgba(34, 197, 94, 0.18);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.4);
}

.status-neutral {
  background: rgba(234, 179, 8, 0.18);
  color: #facc15;
  border: 1px solid rgba(234, 179, 8, 0.4);
}

.status-bad {
  background: rgba(239, 68, 68, 0.18);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.status-select {
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.78rem;
  outline: none;
  cursor: pointer;
}

.status-select:focus {
  border-color: #a855f7;
}

.status-select option {
  background: #18182a;
  color: #fff;
}

.delete-btn {
  margin-left: auto;
  color: #f87171;
  background: transparent;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.18s ease, color 0.18s ease;
}

.delete-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.playing-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 1.6s ease-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
</style>
