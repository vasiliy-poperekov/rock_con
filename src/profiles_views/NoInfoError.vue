<template>
  <a class="errorText" v-on:click="$emit('showPopup')">{{ this.text }}</a>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style>
.errorText {
  width: 1100px;
  font-size: 18px;
  text-align: center;
  color: grey;
}
</style>
