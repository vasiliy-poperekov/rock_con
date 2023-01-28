<template>
  <div class="concert_card">
    <img
      id="group_img"
      :src="getImage()"
      v-if="concert.group.profile_photo != null && concert.group.profile_photo !== undefined"
    />
    <img
      src="@/assets/No_Image_y1ta-tl.png"
      id="group_img"
      v-if="concert.group.profile_photo == null || concert.group.profile_photo === undefined"
      alt="group_logo_no_image"
    />
    <div class="text_container_group">
      <router-link id="group_name" :to="'/group/' + concert.group.id">{{
        concert.group.name
      }}</router-link>
    </div>
    <div class="text_container_concert">
      <router-link id="concert_info" :to="'/place/' + concert.place.id">{{
        getDateTime(concert.date) +
        " - " +
        concert.place.place_type +
        " " +
        concert.place.name
      }}</router-link>
    </div>
    <div class="product_cover-darkened"></div>
  </div>
</template>

<script>
export default {
  props: ["concert"],
  methods: {
    getDateTime(dateTime) {
      var day = dateTime.substring(8, 10);
      if (day[0] === "0") {
        day = day.substring(1);
      }
      var month = "";
      switch (dateTime.substring(5, 7)) {
        case "01":
          month = "января";
          break;
        case "02":
          month = "февраля";
          break;
        case "03":
          month = "марта";
          break;
        case "04":
          month = "апреля";
          break;
        case "05":
          month = "мая";
          break;
        case "06":
          month = "июня";
          break;
        case "07":
          month = "июля";
          break;
        case "08":
          month = "августа";
          break;
        case "09":
          month = "сентября";
          break;
        case "10":
          month = "октября";
          break;
        case "11":
          month = "ноября";
          break;
        case "12":
          month = "декабря";
          break;
      }
      return day + " " + month + ", " + dateTime.substring(11, 16);
    },
    getImage() {
      return "https://webcreator.pythonanywhere.com" + this.concert.group.profile_photo;
    },
  },
};
</script>

<style scoped>
#concerts {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.concert_card {
  width: 350px;
  height: 275px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}

.concert_card:hover {
  background-color: #80808032;
  cursor: pointer;
  border-radius: 25px;
  height: 275px;
}

#group_img {
  width: 350px;
  height: 200px;
  border-radius: 25px;
}

.text_container_group {
  width: 340px;
  height: 28px;
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.text_container_concert {
  width: 340px;
  height: 40px;
  margin-left: 16px;
  display: flex;
  align-items: center;
}

#group_name {
  color: black;
  font-size: 22px;
  margin: 0;
  text-decoration: none;
}

#concert_info {
  font-size: 16px;
  color: #00000080;
  margin: 0;
  text-decoration: none;
}
</style>
