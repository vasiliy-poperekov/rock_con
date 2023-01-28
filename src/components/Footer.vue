<template>
  <div id="footer">
    <div id="footer_container">
      <a v-on:click="$emit('show-about_us')">О нас</a>
      <a
        v-on:click="$emit('show-login')"
        v-if="!this.isRedirectedPage && (!this.isProfilePage || !this.userIsLogged)"
        >Группам и организаторам</a
      >
      <a
        v-on:click="$emit('logout')"
        v-if="!this.isRedirectedPage && this.isProfilePage && this.userIsLogged"
        >Выход</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["isProfilePage", "userIsLogged", "isRedirectedPage"],
};
</script>

<style scoped>
#footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e7e7e7;
  height: 120px;
  width: 100%;
  position: static;
  bottom: 0;
  left: 0;
}
#footer_container {
  width: 1100px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 24px;
}
</style>
