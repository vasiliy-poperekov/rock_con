<template>
  <div class="place_card" @click="clickPlace">
    <img
      :src="getImage()"
      alt="place_logo"
      class="place_logo"
      v-if="place.profile_photo != null && place.profile_photo !== undefined"
    />
    <img
      src="@/assets/No_Image_y1ta-tl.png"
      class="place_logo"
      v-if="place.profile_photo == null || place.profile_photo === undefined"
      alt="place_logo_no_image"
    />
    <div class="name_container">
      <p class="name">{{ place.name }}</p>
    </div>
    <div class="address_container">
      <p class="address">{{ place.address }}</p>
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
    clickPlace() {
      this.$emit("clickPlace", this.place);
    },
  },
};
</script>

<style scoped>
.place_card {
  width: 430px;
  height: 60px;
  margin-top: 10px;
  background-color: #b7b6b6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.place_card:hover {
  background-color: #989898;
  cursor: pointer;
  border-radius: 10px;
  height: 60px;
}

.place_logo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.name,
.address {
  font-size: 16px;
  text-align: center;
}

.name_container {
  width: 120px;
}

.address_container {
  width: 200px;
}
</style>
