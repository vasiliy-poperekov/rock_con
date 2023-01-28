<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeLogin"></div>
    <div id="sign_in_container">
      <p id="sign_in_title">Вход</p>
      <div id="input_container">
        <input
          type="text"
          id="username"
          placeholder="Логин"
          class="field"
          v-model="group_org_name"
        />
        <input
          type="password"
          id="password"
          placeholder="Пароль"
          class="field"
          v-model="password"
        />
        <a v-on:click="$emit('show-registration')" id="sign_up_text"
          >Зарегистрироваться</a
        >
      </div>
      <button id="sign_in_button" @click="login">Войти</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group_org_name: "",
      password: "",
      nameIsEmpty: false,
      passwordIsEmpty: false,
    };
  },
  methods: {
    closeLogin() {
      this.$emit("closeLogin");
    },
    async login() {
      if (this.group_org_name === "") {
        this.nameIsEmpty = true;
      }
      if (this.password === "") {
        this.passwordIsEmpty = true;
      }
      if (!this.nameIsEmpty && !this.passwordIsEmpty) {
        const response = await fetch("https://webcreator.pythonanywhere.com/users/login/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: `{
              "username": "${this.group_org_name}",
              "password": "${this.password}"
            }`,
        });
        response.json().then((data) => {
          console.log(data);
          if (data.is_group_singer) {
            this.$emit("openGroupProfile", data.user_id, data.token);
          }
          if (data.is_place) {
            this.$emit("openPlaceProfile", data.user_id, data.token);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
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

#sign_in_container {
  width: 450px;
  height: 500px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 15px;
  position: fixed;
  box-shadow: 0 0 3px 0 #6a6a6a;
}

#sign_in_title {
  width: 450px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin: 0;
}

.field {
  width: 350px;
  height: 40px;
  background-color: #b6b6b6;
  border-radius: 10px;
  border: 0;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  font-size: large;
  margin-bottom: 10px;
}

#sign_in_button {
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 18px;
}

#sign_up_text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
  text-decoration: underline;
}

#input_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
