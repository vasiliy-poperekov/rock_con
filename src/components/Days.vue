<template>
  <div
    class="day"
    :style="{ 'background-color': this.setBackgroundColor() }"
    @click="this.setChoosenDay"
  >
    <p class="day_text" :style="{ color: this.setTextColor() }">{{ this.day }}</p>
  </div>
</template>

<script>
export default {
  props: ["day", "choosenDay", "month"],
  methods: {
    setChoosenDay() {
      if (this.day >= new Date().getDate() || this.month !== new Date().getMonth()) {
        this.$emit("setChoosenDay", this.day);
      }
    },
    setBackgroundColor() {
      if (new Date().getDate() > this.day && this.month === new Date().getMonth()) {
        return "#808080";
      } else {
        if (this.choosenDay == this.day) {
          return "#000000";
        } else {
          return "#b6b6b6";
        }
      }
    },
    setTextColor() {
      if (this.choosenDay == this.day) {
        if (this.day >= new Date().getDate() || this.month !== new Date().getMonth()) {
          return "#ffffff";
        } else {
          return "#000000";
        }
      } else {
        return "#000000";
      }
    },
  },
};
</script>

<style scoped>
.day {
  width: 30px;
  height: 40px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
