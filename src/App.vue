<template>
  <body>
    <div id="page-container">
      <router-view />
    </div>
  </body>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  background-color: #d9d9d9;
}
#page-container {
  position: relative;
}
</style>
