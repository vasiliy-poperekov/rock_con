<template>
  <div id="concert_card" @click="editConcert">
    <div id="date_container">
      <p id="day_of_week" class="concert_card_text">{{ getDayOfWeek() }}</p>
      <p id="day_of_month" class="concert_card_text">{{ getDayOfMonth() }}</p>
    </div>
    <p id="time">{{ getTime() }}</p>
    <div id="data_container">
      <p id="address_or_genre" class="concert_card_text">{{ address_or_genre }}</p>
      <p id="infoName" class="concert_card_text">{{ infoName }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["concert", "is_group"],
  data() {
    return {
      address_or_genre: "",
      infoName: "",
      concertDate: null,
    };
  },
  mounted() {
    this.getPlaceInfo(this.is_group);
    this.concertDate = moment(this.concert.date, "YYYY-MM-DD HH:mm:ss").toDate();
  },
  methods: {
    getDayOfWeek() {
      var dayOfWeek = this.concertDate.toLocaleString("default", {
        weekday: "long",
      });
      return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    },

    getDayOfMonth() {
      const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];
      return this.concertDate.getDate() + " " + months[this.concertDate.getMonth()];
    },

    getTime() {
      let hours =
        this.concertDate.getHours() < 10
          ? "0" + this.concertDate.getHours()
          : this.concertDate.getHours();
      let minutes =
        this.concertDate.getMinutes() < 10
          ? "0" + this.concertDate.getMinutes()
          : this.concertDate.getMinutes();
      return hours + ":" + minutes;
    },

    getPlaceInfo(is_group) {
      if (!is_group) {
        this.address_or_genre = this.concert.place.address;
        this.infoName = this.concert.place.name;
      } else {
        this.address_or_genre = this.concert.group.genres;
        this.infoName = this.concert.group.name;
      }
    },

    editConcert() {
      this.$emit("editConcert", this.concert);
    },
  },
};
</script>

<style>
#concert_card {
  width: 1100px;
  height: 80px;
  margin-top: 10px;
  background-color: #b7b6b6;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
}

#date_container {
  width: 200px;
}

#day_of_week {
  color: rgba(0, 0, 0, 0.5);
}

#time {
  width: 200px;
}

#data_container {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;
}

#address_or_genre {
  color: rgba(0, 0, 0, 0.5);
  clear: both;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.concert_card_text {
  width: 200px;
  margin: 0;
}
</style>
