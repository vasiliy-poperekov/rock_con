<template>
  <div class="group_card" :style="styleObject" @click="clickGroup">
    <img
      :src="getImage()"
      alt="group_logo"
      class="group_logo"
      v-if="group.profile_photo != null && group.profile_photo !== undefined"
    />
    <img
      src="@/assets/No_Image_y1ta-tl.png"
      class="group_logo"
      v-if="group.profile_photo == null || group.profile_photo === undefined"
      alt="group_logo_no_image"
    />
    <div class="name_container">
      <p class="name">{{ group.name }}</p>
    </div>
    <div class="genres_container">
      <p class="genres">{{ group.genres }}</p>
    </div>
    <img src="@/assets/more.png" class="more_icon" alt="more info" @click="clickMore" />
  </div>
</template>

<script>
export default {
  props: ["group", "isClicked"],
  computed: {
    styleObject: function () {
      if (this.isClicked) {
        return {
          "--background-color": "#7d7d7d",
          "--background-color-hover": "#989898",
        };
      } else {
        return {
          "--background-color": "#b7b6b6",
          "--background-color-hover": "#989898",
        };
      }
    },
  },
  methods: {
    getImage() {
      return "https://webcreator.pythonanywhere.com" + this.group.profile_photo;
    },
    clickGroup() {
      this.$emit("clickGroup", this.group);
    },
    clickMore() {
      this.$emit("clickMore", this.group);
    },
  },
};
</script>

<style scoped>
.group_card {
  width: 430px;
  height: 60px;
  margin-top: 10px;
  background-color: var(--background-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.group_card:hover {
  background-color: var(--background-color-hover);
  cursor: pointer;
  border-radius: 10px;
  height: 60px;
}

.group_logo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.more_icon {
  width: 20px;
  height: 20px;
}

.name,
.genres {
  font-size: 16px;
  clear: both;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}

.name_container {
  width: 120px;
}

.genres_container {
  width: 200px;
}
</style>
