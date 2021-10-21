<template>
  <div>
    <favorite-card
      v-for="favor in favorites"
      :key="favor.id"
      :favorite="favor"
    ></favorite-card>
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

</style>
