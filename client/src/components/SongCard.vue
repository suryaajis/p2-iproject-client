<template>
  <b-col sm="3">
    <b-card
      :title="item.title"
      :img-src="item.album.cover"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{ item.link }}
      </b-card-text>

      <audio controls :src="item.preview"></audio>

      <b-button href="#" variant="primary" @click.prevent="addFavorite(item)">Add Favorite</b-button>
    </b-card>
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "SongCard",
  props: ['item'],
  methods: {
    ...mapActions(['createFavorite']),
    addFavorite(item) {
      this.createFavorite(item)
    }
  }
};
</script>

<style></style>
