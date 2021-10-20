<template>
  <b-col sm="3">
    <b-card
      :title="item.title"
      :img-src="item.artist.picture"
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

      <b-button href="#" variant="primary">Add Favorite</b-button>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "SongCard",
  props: ['item']
};
</script>

<style></style>
