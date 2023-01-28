<template>
  <div id="description">
    <p class="container_title">Описание</p>
    <p id="description_info">
      {{ this.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["description"],
};
</script>

<style>
#description {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.container_title {
  width: 1100px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
}

#description_info {
  font-size: 18px;
}
</style>
