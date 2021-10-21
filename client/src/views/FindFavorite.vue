<template>
  <div class="container find-box mt-3">
    <h1>Find Music</h1>

    <b-form class="search-box mb-4" @submit.prevent="findMusic">

      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input placeholder="Search by artist or title" v-model="query"></b-form-input>
      </b-input-group>

      <b-button type="submit" variant="primary">Search</b-button>
      <b-button class="btn btn-warning" style="margin-left:5px;" @click.prevent="clear">Reset</b-button>
    </b-form>

    <b-container class="bv-example-row">
      <b-row>
        <song-card
          v-for="song in searchItems.data"
          :key="song.id"
          :item="song"
        ></song-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import SongCard from '../components/SongCard.vue';
export default {
  components: { SongCard },
  name: "FindFavorite",
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapState(["searchItems"]),
  },
  methods: {
    ...mapActions(["findMusicDeezer"]),
    ...mapMutations({
      clearSearch: "SEARCH_ITEM"
    }),
    findMusic() {
      if(this.query !== "") {
        this.findMusicDeezer(this.query);
      } else {
        this.clearSearch([])
      }
    },
    clear() {
      this.query = ""
    }
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
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  margin-right: 10px;
}
</style>
