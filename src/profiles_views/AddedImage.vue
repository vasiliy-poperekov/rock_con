<template>
  <img class="added_image" :src="getImage()" />
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
.added_image {
  width: 350px;
  height: 200px;
  border-radius: 25px;
}
</style>
