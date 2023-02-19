<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeEditPopup" />
    <div class="adding_container">
      <p class="title">Редактирование профиля</p>
      <div class="content_container">
        <p class="image_container_title">Фото профиля</p>
        <ProfileImage
          v-if="this.group.profile_photo !== null"
          v-bind:image="this.group.profile_photo"
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
          placeholder="Название группы"
          class="field"
          v-model="group_name"
        />
      </div>
      <div class="content_container">
        <input type="text" placeholder="Жанры" class="field" v-model="genre" />
      </div>
      <div class="content_container">
        <p class="image_container_title">Фото 1</p>
        <AddedImage
          v-if="this.group.image1 !== null"
          v-bind:image="this.group.image1"
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
          v-if="this.group.image2 !== null"
          v-bind:image="this.group.image2"
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
          v-if="this.group.image3 !== null"
          v-bind:image="this.group.image3"
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
      <button id="save" @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddedImage from "@/profiles_views/AddedImage";
import NoInfoError from "@/profiles_views/NoInfoError";
import ProfileImage from "@/profiles_views/ProfileImage.vue";
export default {
  props: ["group", "token"],
  components: {
    AddedImage,
    NoInfoError,
    ProfileImage,
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
      group_name: "",
      genre: "",
      description: "",
    };
  },
  beforeMount() {
    if (this.group.name != null || this.group.name !== undefined) {
      this.group_name = this.group.name;
    }
    if (this.group.genres != null || this.group.genres !== undefined) {
      this.genre = this.group.genres;
    }
    if (this.group.description != null || this.group.description !== undefined) {
      this.description = this.group.description;
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
        this.group_name != null &&
        this.group_name !== "" &&
        this.genre != null &&
        this.genre !== "" &&
        this.description != null &&
        this.description !== ""
      ) {
        let response = await fetch(
          "https://webcreator.pythonanywhere.com/users/group_singer/" +
            this.group.id +
            "/",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Token " + this.token,
            },
            body: `{
          "name": "${this.group_name}",
          "genres": "${this.genre}",
          "description": "${this.description}"
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
        "https://webcreator.pythonanywhere.com/users/group_singer/image/" +
          this.group.id +
          "/",
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

.adding_container {
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
</style>
