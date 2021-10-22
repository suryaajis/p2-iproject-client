<template>
  <div class="container find-box mt-3">
    <div class="route-search">
      <a href="" @click.prevent="findSong">Music</a> |
      <a href="" @click.prevent="findLyric">Lyric</a>
    </div>
    <h1>Find Music</h1>

    <b-form
      v-if="search === 'music'"
      class="search-box mb-4"
      @submit.prevent="findMusic"
    >
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          placeholder="Search by artist or title"
          v-model="songQuery"
        ></b-form-input>
      </b-input-group>

      <b-button type="submit" variant="primary">Search</b-button>
      <b-button
        class="btn btn-warning"
        style="margin-left:5px;"
        @click.prevent="clear"
        >Reset</b-button
      >
    </b-form>

    <b-form
      v-if="search === 'lyrics'"
      class="search-box mb-4"
      @submit.prevent="findMusicLrc"
    >
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          placeholder="Title"
          v-model="lyricQuery.title"
        ></b-form-input>
        <b-form-input
          placeholder="Artist Name"
          v-model="lyricQuery.artist"
        ></b-form-input>
      </b-input-group>
      <b-button type="submit" variant="primary">Search</b-button>
      <b-button
        class="btn btn-warning"
        style="margin-left:5px;"
        @click.prevent="clear"
        >Reset</b-button
      >
    </b-form>

    <b-container class="bv-example-row">
      <b-row v-if="search === 'music'">
        <song-card
          v-for="song in searchSongs.data"
          :key="song.id"
          :item="song"
        ></song-card>
      </b-row>
      <b-row v-if="search === 'lyrics'">
        <p>{{ searchLyric }}</p>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import SongCard from "../components/SongCard.vue";
export default {
  components: { SongCard },
  name: "FindMusic",
  data() {
    return {
      search: "music",
      songQuery: "",
      lyricQuery: {
        artist: "",
        title: "",
      },
    };
  },
  computed: {
    ...mapState(["searchSongs", "searchLyric"]),
  },
  methods: {
    ...mapActions(["findMusicDeezer", "findMusicLyrics"]),
    ...mapMutations({
      clearSearch: "CLEAR_SEARCH",
    }),
    findMusic() {
      if (this.songQuery !== "") {
        this.lyricQuery = "";
        this.findMusicDeezer(this.songQuery);
      } else {
        this.clearSearch();
      }
    },
    findMusicLrc() {
      if (this.lyricQuery.artist !== "" && this.lyricQuery.title !== "") {
        this.songQuery = "";
        this.findMusicLyrics(this.lyricQuery);
      } else {
        this.clearSearch();
      }
    },
    clear() {
      this.songQuery = "";
      this.lyricQuery.artist = "";
      this.lyricQuery.title = "";
    },
    findSong() {
      this.clearSearch();
      this.search = "music";
    },
    findLyric() {
      this.clearSearch();
      this.search = "lyrics";
    },
  },
};
</script>

<style>
.find-box {
  text-align: center;
}
.search-box {
  display: inline-flex;
  width: 600px;
}
.search-box input {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin-right: 10px;
}
.route-search a {
  text-decoration: none;
  font-weight: bold;
}
</style>
