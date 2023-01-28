<template>
  <div id="main_info">
    <img id="main_image" :src="getImage()" />
    <div id="card_info_container">
      <p id="name">{{ group.name }}</p>
      <p id="genre">Жанр: {{ group.genres }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["group"],
  methods: {
    getImage() {
      return "https://webcreator.pythonanywhere.com" + this.group.profile_photo;
    },
  },
};
</script>

<style scoped>
#main_info {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#main_image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

#card_info_container {
  width: 300px;
}

#name {
  width: 300px;
  height: 30px;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

#genre {
  width: 300px;
  height: 90px;
  font-size: 20px;
  margin: 0;
}
</style>
