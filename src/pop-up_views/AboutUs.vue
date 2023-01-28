<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeAboutUs"></div>
    <div id="about_us_container">
      <p id="about_us_title">О нас</p>
      <p id="about_us">
        Мы - организация дающая возможность начинающим исполнителям попробовать свои силы
        на живой публике, слушателям открыть для себя новых звёзд а владельцам заведений
        найти посетителей.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeAboutUs() {
      this.$emit("closeAboutUs");
    },
  },
};
</script>

<style>
.popup {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #b6b6b65f;
}

.bottom_layer {
  height: 100%;
  width: 100%;
}

#about_us_container {
  width: 450px;
  height: 500px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-radius: 15px;
  position: fixed;
  box-shadow: 0 0 3px 0 #6a6a6a;
}

#about_us_title {
  width: 450px;
  height: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
}

#about_us {
  margin-top: 50px;
  width: 440px;
  height: 300px;
  font-size: 20px;
  text-align: center;
}
</style>
