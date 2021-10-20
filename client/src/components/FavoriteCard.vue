<template>
  <div class="container" style="margin-top:20px;">
    <b-card
      class="card-box mb-3"
      :img-src="favorite.Song.cover"
      img-alt="Card image"
      img-left
      style="display:flex;"
    >
      <b-card-text>
        {{ favorite.Song.artist }} - {{ favorite.Song.title }}
      </b-card-text>
      <audio controls>
        <source :src="favorite.Song.songUrl" />
      </audio>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "FavoriteCard",
  props: ["favorite"],
};
</script>

<style>
.card-box {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  height: 120px;
}
</style>
