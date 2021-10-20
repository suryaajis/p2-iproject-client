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

      <b-form-select @change="changeStatus($event)" v-model="selected" :options="options"></b-form-select>
      <b-button @click.prevent="onDeleteFavorite(favorite.id)">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FavoriteCard",
  data() {
    return {
      selected: this.favorite.status,
      options: [
        { value: "Excellent", text: "Excellent" },
        { value: "Liked", text: "Liked" },
        { value: "Good", text: "Good" },
        { value: "Disliked", text: "Disliked" },
        { value: "Worst", text: "Worst" },
      ],
    };
  },
  props: ["favorite"],
  methods: {
    ...mapActions(["deleteFavorite", "fetchFavorites", "changeStatusFavorite"]),
    async onDeleteFavorite(favoriteId) {
      await this.deleteFavorite(favoriteId);
      this.fetchFavorites();
    },
    async changeStatus(status) {
      const payload = {
        status,
        favoriteId: this.favorite.id
      }
      await this.changeStatusFavorite(payload)
      await this.fetchFavorites()
      this.selected = this.favorite.status
    }
  },
};
</script>

<style>
.card-box {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  height: 120px;
}
</style>
