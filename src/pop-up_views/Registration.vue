<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeRegistration"></div>
    <div id="sign_up_container">
      <p id="sign_up_title">Регистрация</p>
      <div class="input_container">
        <div id="choice_container">
          <div id="group_choice_container">
            <input
              type="radio"
              name="choice"
              class="radio_button"
              value="group"
              v-model="userType"
            />
            <p class="choice_text">Группа/исполнитель</p>
          </div>
          <div id="place_choice_container">
            <input
              type="radio"
              name="choice"
              class="radio_button"
              value="org"
              v-model="userType"
            />
            <p class="choice_text">Организатор</p>
          </div>
        </div>
        <div class="text_container">
          <input
            type="text"
            id="group_org_name"
            placeholder="Логин"
            class="field"
            v-model="username"
          />
          <input
            type="password"
            id="password"
            placeholder="Пароль"
            class="field"
            v-model="password"
          />
          <input
            type="text"
            placeholder="Название группы/организации"
            class="field"
            v-model="group_org_name"
          />
          <input
            type="text"
            placeholder="Жанр"
            class="field"
            v-model="genre"
            v-if="userType === 'group'"
          />
          <input
            type="text"
            placeholder="Тип заведения"
            class="field"
            v-model="place_type"
            v-if="userType === 'org'"
          />
          <input
            type="text"
            placeholder="Адрес"
            class="field"
            v-model="address"
            v-if="userType === 'org'"
          />
          <input
            type="text"
            placeholder="Номер"
            class="field"
            v-model="number"
            v-if="userType === 'org'"
          />
          <textarea
            type="text"
            placeholder="Описание"
            class="field description"
            v-model="description"
          />
        </div>
        <div class="image_container">
          <p class="photo_profile_title">Фото профиля:</p>
          <input
            type="file"
            accept="image/*"
            class="form-control-file"
            @change="updatePhoto($event.target.files)"
          />
        </div>
      </div>
      <button id="sign_up_button" @click="registerUser">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userType: "group",
      username: "",
      group_org_name: "",
      password: "",
      genre: "",
      place_type: "",
      address: "",
      number: "",
      description: "",
      profilePhoto: {
        name: "",
        data: [],
      },
      photo: {},
      userTypeIsNotDefine: false,
      usernameIsEmpty: false,
      genreIsEmpty: false,
      place_typeIsEmpty: false,
      addressIsEmpty: false,
      numberIsEmpty: false,
      descriptionIsEmpty: false,
    };
  },
  methods: {
    updatePhoto(files) {
      if (!files.length) return;

      this.profilePhoto = {
        name: files[0].name,
        data: files[0],
      };
    },
    updateProfilePhoto(event) {
      console.log(event.targer.files);
    },
    closeRegistration() {
      this.$emit("closeRegistration");
    },
    async registerUser() {
      if (this.userType === "") {
        this.userTypeIsNotDefine = true;
      }
      if (this.name === "") {
        this.nameIsEmpty = true;
      }
      if (this.password === "") {
        this.passwordIsEmpty = true;
      }

      if (!this.userTypeIsNotDefine && !this.nameIsEmpty && !this.passwordIsEmpty) {
        if (this.userType === "group") {
          const response = await fetch(
            "https://webcreator.pythonanywhere.com/users/group_singer/signup/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: `{
              "username": "${this.username}",
              "password": "${this.password}",
              "password2": "${this.password}"
            }`,
            }
          );
          response.json().then((data) => {
            this.addGroupInfo(data);
          });
          this.closeRegistration();
        } else {
          const response = await fetch("https://webcreator.pythonanywhere.com/users/place/signup/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: `{
              "username": "${this.username}",
              "password": "${this.password}",
              "password2": "${this.password}"
            }`,
          });
          response.json().then((data) => {
            this.addPlaceInfo(data);
          });
          this.closeRegistration();
        }
      }
    },
    async addGroupInfo(data) {
      const addResponse = await fetch(
        "https://webcreator.pythonanywhere.com/users/group_singer/" + data.id + "/",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + data.token,
          },
          body: `{
          "name": "${this.group_org_name}",
          "genres": "${this.genre}",
          "description": "${this.description}"
        }`,
        }
      );

      this.addImage("group", data);
    },
    async addPlaceInfo(data) {
      const addResponse = await fetch(
        "https://webcreator.pythonanywhere.com/users/place/" + data.id + "/",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + data.token,
          },
          body: `{
          "name": "${this.group_org_name}",
          "address": "${this.address}",
          "phone_number": "${this.number}",
          "description": "${this.description}",
          "place_type": "${this.place_type}"
        }`,
        }
      );

      this.addImage("place", data);
    },
    async addImage(userType, data) {
      let formData = new FormData();
      formData.append("profile_photo", this.profilePhoto.data);

      console.log(this.profilePhoto.data);

      if (userType == "group") {
        axios.put(
          "https://webcreator.pythonanywhere.com/users/group_singer/image/" + data.id + "/",
          formData,
          { headers: { Authorization: "Token " + data.token } }
        );
      } else {
        axios.put("https://webcreator.pythonanywhere.com/users/place/image/" + data.id + "/", formData, {
          headers: { Authorization: "Token " + data.token },
        });
      }
    },
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: transparent;
}

.bottom_layer {
  height: 100%;
  width: 100%;
}

#sign_up_container {
  width: 450px;
  min-height: 500px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 15px;
  position: fixed;
  box-shadow: 0 0 3px 0 #6a6a6a;
}

#sign_up_title {
  width: 450px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin: 0;
  margin-top: 16px;
}

#choice_container {
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#group_choice_container {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#place_choice_container {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choice {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid black;
}

.choice_text {
  font-size: 18px;
  padding-left: 2px;
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
  font-size: 20px;
  font-family: "Arial";
  margin-bottom: 10px;
}

.description {
  height: 60px;
}

.text_container {
  width: 380px;
}

#sign_up_button {
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 18px;
  margin-bottom: 16px;
  margin-top: 16px;
}

.radio_button {
  width: 20px;
  height: 20px;
  accent-color: black;
}

.input_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.photo_profile_title {
  margin: 0;
  width: 170px;
}
.image_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 40px;
  font-size: 20px;
  font-family: "Arial";
}
</style>
