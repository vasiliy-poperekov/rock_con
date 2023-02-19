<template>
  <img class="added_profile_image" :src="getImage()" />
</template>

<script>
export default {
  props: ["image"],
  methods: {
    getImage() {
      return "https://webcreator.pythonanywhere.com" + this.image;
    },
  },
};
</script>

<style scoped>
.added_profile_image {
  width: 101px;
  height: 101px;
  border-radius: 50%;
  margin-right: 50px;
}
</style>
