<template>
  <div class="container" style="margin-top:20px;">
    <b-card
      class="card-box mb-3"
      :img-src="favorite.Song.cover"
      img-alt="Card image"
      img-left
    >
      <b-card-text>
        {{ favorite.Song.artist }} - {{ favorite.Song.title }}
      </b-card-text>
      <audio id="audio" :src="favorite.Song.songUrl" controls></audio>

      <div style="display:inline-flex;">
        <b-form-group>
          <b-form-select
            class="select-form"
            @change="changeStatus($event)"
            v-model="selected"
            :options="options"
          ></b-form-select>
        </b-form-group>

        <b-button
          @click.prevent="onDeleteFavorite(favorite.id)"
          class="btn btn-danger"
          >Delete</b-button
        >
      </div>
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
      this.$toast.success('Success delete favorite')
    },
    async changeStatus(status) {
      const payload = {
        status,
        favoriteId: this.favorite.id,
      };
      await this.changeStatusFavorite(payload);
      await this.fetchFavorites();
      this.selected = this.favorite.status;
      this.$toast.success('Success change status favorite')
    },
  },
};
</script>

<style>
.card-box {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  height: 130px;
  display: inline-flex;
}

.select-form {
  width: 120px;
  height: 50px;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 15px;
  font-family: "Saira", sans-serif;
  border: 5px solid rgb(112, 112, 112)
}
</style>
