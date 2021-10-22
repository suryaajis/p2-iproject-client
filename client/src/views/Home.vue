<template>
  <div>
    <div v-if="favorites.length > 0">
      <favorite-card
        v-for="favor in favorites"
        :key="favor.id"
        :favorite="favor"
      ></favorite-card>
    </div>
    <div v-if="favorites.length === 0" class="empty">
      <h1>Your favorites are empty</h1>
      <b-icon
        icon="file-earmark-x" font-scale="8"
      ></b-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FavoriteCard from "../components/FavoriteCard.vue";
export default {
  name: "Home",
  components: { FavoriteCard },
  computed: {
    ...mapState(["favorites"]),
  },
  methods: {
    ...mapActions(["fetchFavorites"]),
  },
  created() {
    this.fetchFavorites();
  },
};
</script>

<style>
.empty {
  margin-top: 130px;
}
</style>
