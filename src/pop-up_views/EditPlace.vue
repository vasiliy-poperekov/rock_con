<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeEditPopup" />
    <div class="outside_container">
      <div class="adding_container">
        <p class="title">Редактирование профиля</p>
        <div class="content_container">
          <p class="image_container_title">Фото профиля</p>
          <ProfileImage
            v-if="this.place.profile_photo !== null"
            v-bind:image="this.place.profile_photo"
            class="added_image_component"
          />
          <input
            type="file"
            accept="image/*"
            class="form-control-file"
            @change="updatePhoto('profile_photo', $event.target.files)"
          />
        </div>
        <div class="content_container">
          <input
            type="text"
            placeholder="Название организации"
            class="field"
            v-model="place_name"
          />
        </div>
        <div class="content_container">
          <input
            type="text"
            placeholder="Тип заведения"
            class="field"
            v-model="place_type"
          />
        </div>
        <div class="content_container">
          <input type="text" placeholder="Адрес" class="field" v-model="address" />
        </div>
        <div class="content_container">
          <input type="text" placeholder="Номер" class="field" v-model="number" />
        </div>
        <div class="content_container">
          <p class="image_container_title">Фото 1</p>
          <AddedImage
            v-if="this.place.image1 !== null"
            v-bind:image="this.place.image1"
            class="added_image_component"
          />
          <input
            type="file"
            accept="image/*"
            class="form-control-file"
            @change="updatePhoto('image1', $event.target.files)"
          />
        </div>
        <div class="content_container">
          <p class="image_container_title">Фото 2</p>
          <AddedImage
            v-if="this.place.image2 !== null"
            v-bind:image="this.place.image2"
            class="added_image_component"
          />
          <input
            type="file"
            accept="image/*"
            class="form-control-file"
            @change="updatePhoto('image2', $event.target.files)"
          />
        </div>
        <div class="content_container">
          <p class="image_container_title">Фото 3</p>
          <AddedImage
            v-if="this.place.image3 !== null"
            v-bind:image="this.place.image3"
            class="added_image_component"
          />
          <input
            type="file"
            accept="image/*"
            class="form-control-file"
            @change="updatePhoto('image3', $event.target.files)"
          />
        </div>
        <div class="content_container">
          <textarea
            type="text"
            placeholder="Описание"
            class="field description"
            v-model="description"
          />
        </div>
        <button id="save" @click="save">Сохранить изменения</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddedImage from "@/profiles_views/AddedImage";
import NoInfoError from "@/profiles_views/NoInfoError";
import ProfileImage from "@/profiles_views/ProfileImage.vue";
export default {
  props: ["place", "token"],
  components: {
    AddedImage,
    NoInfoError,
    ProfileImage
  },
  data() {
    return {
      profile_photo: ({
        data: [],
      } = null),
      image1: ({
        data: [],
      } = null),
      image2: ({
        data: [],
      } = null),
      image3: ({
        data: [],
      } = null),
      place_name: "",
      description: "",
      place_type: "",
      address: "",
      number: "",
    };
  },
  beforeMount() {
    if (this.place.name != null || this.place.name !== undefined) {
      this.place_name = this.place.name;
    }
    if (this.place.place_type != null || this.place.place_type !== undefined) {
      this.place_type = this.place.place_type;
    }
    if (this.place.description != null || this.place.description !== undefined) {
      this.description = this.place.description;
    }
    if (this.place.address != null || this.place.address !== undefined) {
      this.address = this.place.address;
    }
    if (this.place.phone_number != null || this.place.phone_number !== undefined) {
      this.number = this.place.phone_number;
    }
  },
  methods: {
    updatePhoto(imageType, files) {
      switch (imageType) {
        case "profile_photo":
          this.profile_photo = {
            data: files[0],
          };
          break;
        case "image1":
          this.image1 = {
            data: files[0],
          };
          break;
        case "image2":
          this.image2 = {
            data: files[0],
          };
          break;
        case "image3":
          this.image3 = {
            data: files[0],
          };
          break;
      }
    },
    async save() {
      if (
        this.place_name != null &&
        this.place_name !== "" &&
        this.place_type != null &&
        this.place_type !== "" &&
        this.description != null &&
        this.description !== "" &&
        this.address != null &&
        this.address !== "" &&
        this.number != null &&
        this.number !== ""
      ) {
        let response = await fetch(
          "https://webcreator.pythonanywhere.com/users/place/" + this.place.id + "/",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Token " + this.token,
            },
            body: `{
                "name": "${this.place_name}",
                "place_type": "${this.place_type}",
                "description": "${this.description}",
                "address": "${this.address}",
                "phone_number": "${this.number}"
            }`,
          }
        );
      }

      this.saveImages();
    },
    async saveImages() {
      let formData = new FormData();
      if (this.profile_photo != null) {
        formData.append("profile_photo", this.profile_photo.data);
      }
      if (this.image1 != null) {
        formData.append("image1", this.image1.data);
      }
      if (this.image2 != null) {
        formData.append("image2", this.image2.data);
      }
      if (this.image3 != null) {
        formData.append("image3", this.image3.data);
      }

      await axios.put(
        "https://webcreator.pythonanywhere.com/users/place/image/" + this.place.id + "/",
        formData,
        { headers: { Authorization: "Token " + this.token } }
      );

      this.closeAndRefreshEditPopup();
    },
    closeEditPopup() {
      this.$emit("closeEditPopup");
    },
    closeAndRefreshEditPopup() {
      this.$emit("closeAndRefreshEditPopup");
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

.outside_container {
  width: 500px;
  height: 710px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 15px;
  position: fixed;
  box-shadow: 0 0 3px 0 #6a6a6a;
}

.adding_container {
  width: 490px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
}

.added_image {
  width: 150px;
  height: 75px;
  border-radius: 15px;
}

.added_image_component {
  margin-bottom: 6px;
}

.title {
  width: 450px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-top: 8px;
}

.content_container {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.image_container_title {
  width: 400px;
  margin-top: 0px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
}

.form-control-file {
  margin-left: 16px;
}

#save {
  width: 380px;
  height: 40px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 18px;
  margin-bottom: 8px;
}

.field {
  width: 400px;
  height: 30px;
  background-color: #b6b6b6;
  border-radius: 10px;
  border: 0;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  font-family: "Arial";
  margin-bottom: 8px;
}

.description {
  height: 60px;
}

.adding_container::-webkit-scrollbar {
  width: 12px;
  border-radius: 15px;
  background-color: grey;
}

.adding_container::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 15px;
}
</style>
