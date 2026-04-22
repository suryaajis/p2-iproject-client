<template>
  <Transition name="lyrics-slide">
    <div v-if="showLyrics && currentSong" class="lyrics-panel">
      <div class="lyrics-header">
        <div class="lyrics-header-left">
          <img :src="currentSong.cover" class="lyrics-cover" alt="cover" />
          <div class="lyrics-meta">
            <span class="lyrics-song-name">{{ currentSong.title }}</span>
            <span class="lyrics-artist-name">{{ currentSong.artist }}</span>
          </div>
        </div>
        <div class="lyrics-header-right">
          <div class="lyrics-progress-bar">
            <div class="lyrics-progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="lyrics-time">{{ formatTime(audioCurrentTime) }} / {{ formatTime(audioDuration) }}</span>
        </div>
        <button class="lyrics-close-btn" @click="toggleLyrics" aria-label="Close lyrics">
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>

      <div class="lyrics-body" ref="lyricsBody">
        <template v-if="hasLyrics">
          <p
            v-for="(line, i) in lyricsLines"
            :key="i"
            class="lyrics-line"
            :class="{
              'lyrics-line--active': i === activeLineIndex,
              'lyrics-line--past': i < activeLineIndex,
              'lyrics-line--empty': line === ''
            }"
          >
            {{ line || '​' }}
          </p>
        </template>

        <div v-else class="lyrics-empty">
          <i class="bi bi-music-note-beamed lyrics-empty-icon"></i>
          <p>No lyrics available for this track.</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LyricsPanel',
  computed: {
    ...mapState(['currentSong', 'showLyrics', 'audioCurrentTime', 'audioDuration']),
    lyricsLines() {
      const raw = this.currentSong?.lyrics
      if (!raw) return []
      return raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
    },
    hasLyrics() {
      return this.lyricsLines.some(l => l.trim() !== '')
    },
    // Only non-empty lines count for timing — map them back to full array indices
    contentLineIndices() {
      return this.lyricsLines
        .map((l, i) => ({ line: l, i }))
        .filter(({ line }) => line.trim() !== '')
        .map(({ i }) => i)
    },
    activeLineIndex() {
      const { audioDuration, audioCurrentTime, contentLineIndices } = this
      if (!audioDuration || !contentLineIndices.length) return -1
      const progress = Math.min(audioCurrentTime / audioDuration, 0.9999)
      const contentIdx = Math.floor(progress * contentLineIndices.length)
      return contentLineIndices[Math.min(contentIdx, contentLineIndices.length - 1)]
    },
    progressPercent() {
      if (!this.audioDuration) return 0
      return Math.min((this.audioCurrentTime / this.audioDuration) * 100, 100)
    }
  },
  watch: {
    activeLineIndex(newIdx) {
      if (newIdx < 0) return
      this.$nextTick(() => {
        const body = this.$refs.lyricsBody
        if (!body) return
        const lines = body.querySelectorAll('.lyrics-line')
        const el = lines[newIdx]
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    },
    showLyrics(visible) {
      if (visible) {
        this.$nextTick(() => {
          const body = this.$refs.lyricsBody
          if (!body) return
          const lines = body.querySelectorAll('.lyrics-line')
          const el = lines[this.activeLineIndex]
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' })
        })
      }
    }
  },
  methods: {
    ...mapActions(['toggleLyrics']),
    formatTime(secs) {
      if (!secs || !isFinite(secs)) return '0:00'
      const m = Math.floor(secs / 60)
      const s = Math.floor(secs % 60).toString().padStart(2, '0')
      return `${m}:${s}`
    }
  }
}
</script>

<style scoped>
.lyrics-panel {
  position: fixed;
  left: 240px;
  right: 0;
  bottom: var(--player-height, 70px);
  height: 380px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background: rgba(8, 8, 18, 0.94);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-top: 1px solid rgba(124, 58, 237, 0.35);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.lyrics-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 70%, transparent);
  pointer-events: none;
}

/* Header */
.lyrics-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.lyrics-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.lyrics-cover {
  width: 38px;
  height: 38px;
  border-radius: 6px;
  object-fit: cover;
}

.lyrics-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.lyrics-song-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #f0f0f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.lyrics-artist-name {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.lyrics-header-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.lyrics-progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.lyrics-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  border-radius: 999px;
  transition: width 0.25s linear;
}

.lyrics-time {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.4);
  font-variant-numeric: tabular-nums;
}

.lyrics-close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.18s ease, background 0.18s ease;
  flex-shrink: 0;
}

.lyrics-close-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

/* Body / scrollable lyrics */
.lyrics-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px 40px;
  scrollbar-width: thin;
  scrollbar-color: rgba(124, 58, 237, 0.4) transparent;
  /* Fade top and bottom edges for polished look */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
}

.lyrics-body::-webkit-scrollbar {
  width: 4px;
}

.lyrics-body::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.4);
  border-radius: 999px;
}

/* Lines */
.lyrics-line {
  text-align: center;
  margin: 0;
  padding: 5px 8px;
  color: rgba(255, 255, 255, 0.28);
  font-size: 1rem;
  line-height: 1.7;
  transition: color 0.5s ease, font-size 0.4s ease, font-weight 0.4s ease;
  user-select: none;
}

.lyrics-line--empty {
  padding: 2px;
  min-height: 1.2em;
}

.lyrics-line--past {
  color: rgba(255, 255, 255, 0.48);
}

.lyrics-line--active {
  font-size: 1.18rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #fff 30%, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.6));
}

/* Empty state */
.lyrics-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: rgba(255, 255, 255, 0.35);
}

.lyrics-empty-icon {
  font-size: 2.4rem;
  color: rgba(168, 85, 247, 0.5);
}

.lyrics-empty p {
  margin: 0;
  font-size: 0.9rem;
}

/* Slide-up transition */
.lyrics-slide-enter-active,
.lyrics-slide-leave-active {
  transition: transform 0.38s cubic-bezier(0.2, 0.9, 0.3, 1.1), opacity 0.3s ease;
}

.lyrics-slide-enter-from,
.lyrics-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 767px) {
  .lyrics-panel {
    left: 80px;
  }

  .lyrics-song-name,
  .lyrics-artist-name {
    max-width: 100px;
  }
}

@media (max-width: 575px) {
  .lyrics-panel {
    left: 0;
    height: 320px;
  }

  .lyrics-header-left {
    display: none;
  }
}
</style>
