<template>
  <div class="container find-box">
    <h1>Find Music</h1>

    <b-form class="d-flex search-box" @submit.prevent="findMusic">
      <b-form-input
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Artist Name"
        v-model="artist"
      ></b-form-input>

      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input placeholder="Title" v-model="title"></b-form-input>
      </b-input-group>

      <b-button variant="primary">Search</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "FindFavorite",
  data() {
    return {
      artist: "",
      title: ""
    }
  },
  methods: {
    ...mapActions(['findMusicDeezer']),
    findMusic() {

    }
  }
};
</script>

<style>
.find-box {
  text-align: center;
}
.search-box {
  width: 800px;
}
.search-box input {
  margin-right: 10px;
}
</style>
