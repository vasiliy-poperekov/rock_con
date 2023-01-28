<template>
  <div id="concert_cards">
    <ConcertCard
      v-for="concert of this.concerts"
      v-bind:concert="concert"
      v-bind:key="concert.id"
      v-bind:is_group="is_group"
      v-on:editConcert="editConcert"
    />
  </div>
</template>

<script>
import ConcertCard from "@/profiles_views/ConcertCard";
export default {
  props: ["is_group", "concerts"],
  components: { ConcertCard },
  methods: {
    editConcert(concert) {
      this.$emit("editConcert", concert);
    },
  },
};
</script>

<style>
#concert_cards {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>
