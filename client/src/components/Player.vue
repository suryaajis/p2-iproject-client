<template>
  <b-container class="player">
    <h5 id="title" style="font-size:100px;"></h5>
    <b-icon
      icon="skip-forward-btn-fill"
      class="icons"
      @click.prevent="prevBtn"
      font-scale="3"
    ></b-icon>
    <b-icon
      icon="play-btn-fill"
      @click.prevent="playBtn"
      class="icons"
      font-scale="3"
    ></b-icon>
    <b-icon
      @click.prevent="pauseBtn"
      icon="pause-btn-fill"
      class="icons"
      font-scale="3"
    ></b-icon>
    <b-icon
      icon="skip-backward-btn-fill"
      style="margin-top:12px;"
      font-scale="3"
      class="icons"
      @click.prevent="nextBtn"
    ></b-icon>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
let songIndex = 0;
const audio = document.querySelector("#audio");
export default {
  name: "Player",
  computed: {
    ...mapState(["favorites"]),
  },
  methods: {
    ...mapActions(["fetchFavorites"]),
    loadSong(song) {
      audio.src = song.Song.songUrl;
    },
    playBtn() {
      audio.play();
    },
    pauseBtn() {
      audio.pause();
    },
    nextBtn() {
      songIndex++;

      if (songIndex > this.favorites.length - 1) {
        songIndex = 0;
      }

      this.loadSong(this.favorites[songIndex]);

      this.playBtn();
    },
    prevBtn() {
      songIndex--;

      if (songIndex < 0) {
        songIndex = songIndex.length - 1;
      }

      this.loadSong(this.favorites[songIndex]);

      this.playBtn();
    },
  },
  created() {
    this.loadSong(this.favorites[songIndex]);
  },
};
</script>

<style>
.icons:hover {
  margin-bottom: 3px;
}
</style>
