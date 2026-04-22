<template>
  <div id="app">
    <div v-if="isLogin === true" class="app-shell">
      <aside class="app-sidebar">
        <Sidebar />
      </aside>
      <main class="app-main">
        <div class="app-content">
          <router-view />
        </div>
      </main>

      <LyricsPanel />
      <Player />
      <audio
        ref="globalAudio"
        @ended="nextTrack"
        @timeupdate="onAudioProgress"
        @loadedmetadata="onAudioProgress"
        style="display:none"
      ></audio>
    </div>

    <div v-else class="app-public">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Sidebar from "./components/Sidebar.vue";
import Player from "./components/Player.vue";
import LyricsPanel from "./components/LyricsPanel.vue";
export default {
  name: "App",
  components: { Sidebar, Player, LyricsPanel },
  computed: {
    ...mapState(["isLogin", "currentSong", "isPlaying"]),
  },
  methods: {
    ...mapMutations({
      onLogin: "LOGIN_USER",
      setAudioProgress: "SET_AUDIO_PROGRESS",
    }),
    ...mapActions(["nextTrack"]),
    onAudioProgress() {
      const audio = this.$refs.globalAudio;
      if (!audio) return;
      this.setAudioProgress({
        currentTime: audio.currentTime || 0,
        duration: isFinite(audio.duration) ? audio.duration : 0,
      });
    },
  },
  watch: {
    currentSong(song) {
      if (song && this.$refs.globalAudio) {
        this.$refs.globalAudio.src = song.preview || song.songUrl || "";
        if (this.isPlaying) {
          this.$refs.globalAudio.play().catch(() => {});
        }
      }
    },
    isPlaying(playing) {
      if (!this.$refs.globalAudio) return;
      if (playing) {
        this.$refs.globalAudio.play().catch(() => {});
      } else {
        this.$refs.globalAudio.pause();
      }
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.onLogin(true);
    }
  },
};
</script>

<style>
:root {
  --bg-primary: #0a0a14;
  --bg-secondary: #12121f;
  --bg-card: rgba(255, 255, 255, 0.05);
  --accent-color: #7c3aed;
  --accent-secondary: #a855f7;
  --accent-gradient: linear-gradient(135deg, #7c3aed, #a855f7);
  --text-primary: #f0f0f0;
  --text-muted: rgba(255, 255, 255, 0.5);
  --border-color: rgba(255, 255, 255, 0.1);
  --player-height: 70px;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
}

#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background: var(--bg-primary);
  min-height: 100vh;
  position: relative;
}

#app::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(124, 58, 237, 0.12), transparent 40%),
    radial-gradient(circle at 85% 80%, rgba(168, 85, 247, 0.1), transparent 40%),
    var(--bg-primary);
  z-index: 0;
  pointer-events: none;
}

h1, h2, h3, h4, h5 {
  font-family: "Saira", sans-serif;
}

.app-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

.app-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
}

.app-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  padding-bottom: calc(var(--player-height) + 20px);
}

.app-public {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

@media (max-width: 767px) {
  .app-shell {
    grid-template-columns: 80px 1fr;
  }
}
</style>
