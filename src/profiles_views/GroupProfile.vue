<template>
  <div id="content-wrap">
    <Header v-bind:id="this.id" v-bind:token="this.token" v-bind:type="'group'" />
    <AboutUs v-if="isAboutUsVidible" v-on:closeAboutUs="closeAboutUs" />
    <Login
      v-if="isLoginVisible"
      v-on:closeLogin="closeLogin"
      v-on:show-registration="showRegistration"
      v-on:openGroupProfile="openGroupProfile"
      v-on:openPlaceProfile="openPlaceProfile"
    />
    <Registration
      v-if="isRegistrationVidible"
      v-on:closeRegistration="closeRegistration"
    />
    <EditGroup
      v-if="isEditPopupVisible"
      v-on:closeEditPopup="closeEditPopup"
      v-on:closeAndRefreshEditPopup="closeAndRefreshEditPopup"
      v-bind:group="this.group"
      v-bind:token="this.token"
    />
    <ConnectPlace v-if="isPlacesPopupVisible" v-on:closePlacesPopup="closePlacesPopup" />
    <div id="main_info_container">
      <GroupMainInfo v-bind:group="group" />
    </div>
    <div id="images_container">
      <div id="images">
        <AddedImage v-if="group.image1 !== null" v-bind:image="group.image1" />
        <AddedImage v-if="group.image2 !== null" v-bind:image="group.image2" />
        <AddedImage v-if="group.image2 !== null" v-bind:image="group.image3" />
        <NoInfoError
          v-if="group.image1 === null && group.image2 === null && group.image3 === null"
          v-bind:text="this.noImages"
        />
      </div>
    </div>
    <hr class="solid" />
    <div id="description_container">
      <Description
        v-if="!this.descriptionIsEmpty()"
        v-bind:description="group.description"
      />
      <NoInfoError v-if="this.descriptionIsEmpty()" v-bind:text="this.noDescription" />
    </div>
    <hr class="solid" />
    <div id="concerts_container">
      <p class="container_title">Концерты</p>
      <Concerts
        v-if="this.concerts.length !== 0"
        v-bind:is_group="false"
        v-bind:concerts="this.concerts"
      />
      <NoInfoError v-if="this.concerts.length === 0" v-bind:text="this.noConcerts" />
    </div>
    <hr class="solid" v-if="this.token !== undefined" />
    <div class="edit_link_container">
      <div class="edit_links" v-if="this.token !== undefined">
        <a class="edit_link" v-on:click="showEditPopup">Редактировать профиль</a>
        <a class="edit_link" v-on:click="showPlacesPopup">Связаться с организаторами</a>
      </div>
    </div>
    <Footer
      v-on:show-login="showPopupLogin"
      v-on:show-about_us="showAboutUs"
      v-bind:userIsLogged="this.token !== undefined"
      v-bind:isProfilePage="true"
      v-bind:isRedirectedPage="this.$route.path.includes('place_group')"
      v-on:logout="logout"
    />
  </div>
</template>

<script>
import AddedImage from "@/profiles_views/AddedImage";
import GroupMainInfo from "@/profiles_views/GroupMainInfo";
import NoInfoError from "@/profiles_views/NoInfoError";
import Concerts from "@/profiles_views/Concerts";
import EditGroup from "@/pop-up_views/EditGroup";
import Description from "@/profiles_views/Description";
import Footer from "@/components/Footer";
import AboutUs from "@/pop-up_views/AboutUs";
import Header from "@/components/Header";
import ConnectPlace from "@/pop-up_views/ConnectPlace";
import Login from "@/pop-up_views/Login";
import Registration from "@/pop-up_views/Registration";
import moment from "moment";
export default {
  props: ["id", "token"],
  components: {
    AddedImage,
    GroupMainInfo,
    NoInfoError,
    Description,
    Concerts,
    EditGroup,
    Description,
    Footer,
    AboutUs,
    Header,
    ConnectPlace,
    Login,
    Registration,
  },
  data() {
    return {
      group: {},
      concerts: [],
      noConcerts:
        "У вас пока нет концертов. Свяжитесь с организаторами, для их проведения.",
      noImages: "У вас нет добавленных фото.",
      noDescription: "Отсутсвует информация о вас.",
      isEditPopupVisible: false,
      isAboutUsVidible: false,
      isPlacesPopupVisible: false,
      isLoginVisible: false,
      isRegistrationVidible: false,
    };
  },
  mounted() {
    fetch("https://webcreator.pythonanywhere.com/users/group_singer/details/" + this.id + "/")
      .then((response) => response.json())
      .then((json) => {
        this.group = json;
      });

    fetch("https://webcreator.pythonanywhere.com/concert/")
      .then((response) => response.json())
      .then((json) => {
        this.concerts = json.filter((concert) => {
          return (
            moment(concert.date, "YYYY-MM-DD HH:mm:ss").toDate().getTime() >
              new Date().getTime() && concert.group.id == this.id
          );
        });
      });
  },
  methods: {
    descriptionIsEmpty() {
      return this.group.description === null || this.group.description === "";
    },
    showEditPopup() {
      this.isEditPopupVisible = true;
    },
    closeEditPopup() {
      this.isEditPopupVisible = false;
    },
    closeAndRefreshEditPopup() {
      this.closeEditPopup();
      document.location.reload();
    },
    logout() {
      fetch("https://webcreator.pythonanywhere.com/users/logout/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + this.token,
        },
      });
      this.$router.replace({ path: "/" });
    },
    showAboutUs() {
      this.isAboutUsVidible = true;
    },
    closeAboutUs() {
      this.isAboutUsVidible = false;
    },
    showPlacesPopup() {
      this.isPlacesPopupVisible = true;
    },
    closePlacesPopup() {
      this.isPlacesPopupVisible = false;
    },
    showPopupLogin() {
      this.isLoginVisible = true;
    },
    closeLogin() {
      this.isLoginVisible = false;
    },
    showRegistration() {
      this.isRegistrationVidible = true;
    },
    closeRegistration() {
      this.isRegistrationVidible = false;
    },
    openGroupProfile(loggedId, loggedToken) {
      this.closeLogin();
      this.$router.replace({ path: "/group/" + loggedId + "/" + loggedToken });
    },
    openPlaceProfile(loggedId, loggedToken) {
      this.closeLogin();
      this.$router.replace({ path: "/place/" + loggedId + "/" + loggedToken });
    },
  },
};
</script>

<style>
#main_info_container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

#images_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#images {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#description_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container_title {
  width: 1100px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
}

#concerts_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.solid {
  border-top: 1px solid black;
  width: 1100px;
}

.edit_link_container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.edit_links {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.edit_link {
  font-size: 20px;
  color: grey;
  font-style: italic;
  text-decoration: underline;
}
</style>
