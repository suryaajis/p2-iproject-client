<template>
  <div class="global-player" :class="{ 'has-song': currentSong }">
    <template v-if="currentSong">
      <div class="player-left">
        <img :src="currentSong.cover" class="player-cover" alt="cover" />
        <div class="player-song-meta">
          <div class="player-title" :title="currentSong.title">{{ currentSong.title }}</div>
          <div class="player-artist" :title="currentSong.artist">{{ currentSong.artist }}</div>
        </div>
      </div>
      <div class="player-center">
        <button class="ctrl-btn" @click="prevTrack" aria-label="Previous">
          <i class="bi bi-skip-backward-fill ctrl-icon-md"></i>
        </button>
        <button
          class="ctrl-btn play-pause"
          @click="togglePlay"
          :aria-label="isPlaying ? 'Pause' : 'Play'"
        >
          <i :class="['bi', isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill', 'ctrl-icon-lg']"></i>
        </button>
        <button class="ctrl-btn" @click="nextTrack" aria-label="Next">
          <i class="bi bi-skip-forward-fill ctrl-icon-md"></i>
        </button>
      </div>
      <div class="player-right">
        <button
          class="ctrl-btn lyrics-toggle"
          :class="{ 'lyrics-toggle--active': showLyrics }"
          @click="toggleLyrics"
          aria-label="Toggle lyrics"
          title="Lyrics"
        >
          <i class="bi bi-file-text-fill ctrl-icon-md"></i>
        </button>
      </div>
    </template>
    <template v-else>
      <div class="player-empty">
        <i class="bi bi-music-note-list" style="font-size:1.2rem"></i>
        <span>Select a song to play</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Player',
  computed: {
    ...mapState(['currentSong', 'isPlaying', 'showLyrics'])
  },
  methods: {
    ...mapActions(['togglePlay', 'nextTrack', 'prevTrack', 'toggleLyrics'])
  }
}
</script>

<style scoped>
.global-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70px;
  z-index: 1000;
  background: rgba(10, 10, 20, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #f0f0f0;
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}

.global-player::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7c3aed, #a855f7, transparent);
}

.global-player.has-song {
  animation: slideUp 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.player-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 0;
  min-width: 0;
}

.player-cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.player-song-meta {
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.player-title {
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}

.player-artist {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}

.player-center {
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;
  flex: 1 1 0;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: #f0f0f0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 999px;
  transition: color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.ctrl-btn:hover {
  color: #a855f7;
  transform: scale(1.08);
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.45);
}

.ctrl-btn.play-pause {
  color: #fff;
}

.ctrl-btn.play-pause:hover {
  color: #c4b5fd;
}

.ctrl-icon-md {
  font-size: 1.4rem;
}

.ctrl-icon-lg {
  font-size: 2.2rem;
}

.player-right {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.lyrics-toggle--active {
  color: #a855f7 !important;
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.7));
}

.player-empty {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  width: 100%;
  justify-content: center;
}

@media (max-width: 575px) {
  .player-title,
  .player-artist {
    max-width: 130px;
  }
  .player-right {
    display: none;
  }
}
</style>
