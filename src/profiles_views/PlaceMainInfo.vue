<template>
  <div id="main_info">
    <img id="main_image" :src="getImage()" />
    <div id="card_info_container">
      <p id="name">{{ place.name }}</p>
      <p id="place_type" class="card_info">{{ place.place_type }}</p>
      <p id="phone_number" class="card_info">Номер телефона: {{ place.phone_number }}</p>
      <p id="address" class="card_info">Адрес: {{ place.address }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["place"],
  methods: {
    getImage() {
      return "https://webcreator.pythonanywhere.com" + this.place.profile_photo;
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
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.card_info {
  width: 300px;
  font-size: 20px;
  margin: 0;
}
</style>
