<template>
  <b-col sm="3">
    <b-card
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="song-box"
    >
      <h4>{{item.title}}</h4>
      <iframe
        title="deezer-widget"
        :src="item.widget"
        width="200"
        height="100"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media; clipboard-write"
        class="mb-3 mt-1"
      ></iframe>

      <b-button href="#" variant="primary" @click.prevent="addFavorite(item)"
        >Add Favorite</b-button
      >
    </b-card>
  </b-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SongCard",
  props: ["item"],
  methods: {
    ...mapActions(["createFavorite"]),
    addFavorite(item) {
      this.createFavorite(item);
    },
  },
};
</script>

<style>
.song-box {
  height: 260px;
  width: 100%;
  margin-bottom: 20px;
  margin-right: 10px;
  border-radius: 10%;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
}

.song-box h4 {
  font-size: 16px;
}
</style>
