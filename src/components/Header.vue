<template>
  <header>
    <div id="header_container">
      <img id="logo" src="@/assets/logo.png" v-on:click="navigate" />
      <div class="input_container" v-if="type === undefined || type == null">
        <input
          type="text"
          size="64"
          id="search"
          placeholder="Введите название группы или места"
          v-model="search"
        />
        <img
          class="search_icon"
          src="@/assets/search-interface-symbol.png"
          alt="search"
          @click="this.setSearchLine"
        />
      </div>
      <img
        src="@/assets/user.png"
        alt="profile"
        class="profile_icon"
        v-if="this.page_was_replaced"
        v-on:click="openProfile"
      />
    </div>
  </header>
</template>

<script>
export default {
  props: ["id", "token", "type", "page_was_replaced"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    navigate() {
      let id = this.id;
      let token = this.token;
      if (id !== undefined && id != null && token !== undefined && token != null) {
        if (this.type === "group") {
          this.$router.replace({ path: "/g/" + id + "/" + token });
        } else {
          this.$router.replace({ path: "/p/" + id + "/" + token });
        }
      } else {
        this.$router.push({ path: "/" });
      }
    },
    openProfile() {
      this.$emit("openProfile");
    },
    setSearchLine() {
      this.$emit("setSearchLine", this.search);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
}

#header_container {
  width: 1100px;
  height: 120px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#logo {
  width: 240px;
}

.input_container {
  display: flex;
  align-items: center;
  width: 660px;
  height: 45px;
  background-color: #b6b6b6;
  border-radius: 25px;
}

.search_icon {
  width: 20px;
  height: 20px;
}

#search {
  width: 600px;
  height: 40px;
  background-color: #b6b6b6;
  border-radius: 25px;
  border: 0;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  font-size: large;
}

.profile_icon {
  width: 40px;
  height: 40px;
}
</style>
