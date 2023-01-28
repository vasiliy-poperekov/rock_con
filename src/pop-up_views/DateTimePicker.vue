<template>
  <div class="date_time_picker">
    <div class="date_container">
      <div class="custom-select">
        <select v-model="year" @change="this.setConcertDate">
          <option v-for="i in numberOfYears" :key="i" :value="startingYear + (i - 1)">
            {{ startingYear + (i - 1) }}
          </option>
        </select>
      </div>
      <div class="custom-select">
        <select v-model="month" @change="this.setConcertDate">
          <option v-for="(month, index) in months" :key="month" :value="index">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="custom-select">
        <select v-model="day" @change="this.setConcertDate">
          <option v-for="i in daysInMonth()" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
      </div>
    </div>
    <div class="time_container">
      <input type="text" class="field" v-model="hour" @change="this.setConcertDate" />
      <div class="double_dotts">:</div>
      <input type="text" class="field" v-model="minute" @change="this.setConcertDate" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["concertDate"],
  mounted() {
    if (this.concertDate !== undefined && this.concertDate != null) {
      this.month = this.concertDate.getMonth();
      this.year = this.concertDate.getFullYear();
      this.day = this.concertDate.getDate();

      let hours =
        this.concertDate.getHours() < 10
          ? "0" + this.concertDate.getHours()
          : this.concertDate.getHours();
      let minutes =
        this.concertDate.getMinutes() < 10
          ? "0" + this.concertDate.getMinutes()
          : this.concertDate.getMinutes();
      this.hour = hours;
      this.minute = minutes;
    }
  },
  data() {
    return {
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],

      startingYear: 2023,
      numberOfYears: 10,

      month: "0",
      year: "2023",
      day: "1",
      hour: "00",
      minute: "00",
    };
  },
  methods: {
    daysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    setConcertDate() {
      let date = new Date();
      date.setDate(this.day);
      date.setMonth(this.month);
      date.setFullYear(this.year);
      date.setHours(this.hour);
      date.setMinutes(this.minute);
      this.$emit("setConcertDate", date);
    },
  },
};
</script>

<style scoped>
.date_time_picker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.custom-select {
  background-color: #eee;
  float: left;
  margin-right: 10px;
  position: relative;
  border-radius: 5px;
}

.date_container,
.time_container {
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date_container {
  margin-bottom: 8px;
}

.custom-select select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;
  border: none;
  color: #333;
  display: block;
  font-size: 16px;
  height: 32px;
  padding: 5px 30px 5px 10px;
  margin: 0;
  outline: none;
  border-radius: 5px;
}

.custom-select:after {
  content: "\25bc";
  color: #aaa;
  font-size: 12px;
  position: absolute;
  right: 8px;
  top: 10px;
}

.field {
  width: 40px;
  height: 32px;
  background-color: #eee;
  border-radius: 5px;
  border: 0;
  outline: none;
  padding-left: 2px;
  padding-right: 2px;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
  margin-right: 8px;
}

.double_dotts {
  height: 32px;
  margin-right: 8px;
}
</style>
