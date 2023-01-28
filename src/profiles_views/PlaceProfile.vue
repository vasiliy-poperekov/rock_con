<template>
  <div id="content-wrap">
    <Header v-bind:id="this.id" v-bind:token="this.token" v-bind:type="'place'" />
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
    <AddConcert
      v-if="isAddConcertPopupVisible"
      v-on:closeAddConcertPopup="closeAddConcertPopup"
      v-bind:placeId="this.id"
      v-bind:concert="this.edittedConcert"
      v-on:closeAndRefreshAddConcertPopup="closeAndRefreshAddConcertPopup"
      v-bind:token="this.token"
    />
    <EditPlace
      v-if="isEditPopupVisible"
      v-on:closeEditPopup="closeEditPopup"
      v-on:closeAndRefreshEditPopup="closeAndRefreshEditPopup"
      v-bind:place="this.place"
      v-bind:token="this.token"
    />
    <div id="main_info_container">
      <PlaceMainInfo v-bind:place="place" />
    </div>
    <div id="images_container">
      <div id="images">
        <AddedImage v-if="place.image1 !== null" v-bind:image="place.image1" />
        <AddedImage v-if="place.image2 !== null" v-bind:image="place.image2" />
        <AddedImage v-if="place.image2 !== null" v-bind:image="place.image3" />
        <NoInfoError
          v-if="place.image1 === null && place.image2 === null && place.image3 === null"
          v-bind:text="this.noImages"
        />
      </div>
    </div>
    <hr class="solid" />
    <div id="description_container">
      <Description
        v-if="!this.descriptionIsEmpty()"
        v-bind:description="place.description"
      />
      <NoInfoError v-if="this.descriptionIsEmpty()" v-bind:text="this.noDescription" />
    </div>
    <hr class="solid" />
    <div id="concerts_container">
      <div class="concert_header">
        <p class="concerts_title">Концерты</p>
        <img
          src="@/assets/free-icon-plus-3303893.png"
          alt="add_concert"
          class="add_concert"
          v-on:click="showAddConcertPopup()"
          v-if="this.token !== undefined"
        />
      </div>
      <Concerts
        v-if="this.concerts.length !== 0"
        v-bind:is_group="true"
        v-bind:concerts="this.concerts"
        v-on:editConcert="editConcert"
      />
      <NoInfoError v-if="this.concerts.length === 0" v-bind:text="this.noConcerts" />
    </div>
    <hr class="solid" v-if="this.token !== undefined" />
    <div class="edit_link_container">
      <a class="edit_link" v-on:click="showEditPopup" v-if="this.token !== undefined"
        >Редактировать профиль</a
      >
    </div>
    <Footer
      v-on:show-login="showPopupLogin"
      v-on:show-about_us="showAboutUs"
      v-bind:userIsLogged="this.token !== undefined"
      v-bind:isProfilePage="true"
      v-bind:isRedirectedPage="this.$route.path.includes('group_place')"
      v-on:logout="logout"
    />
  </div>
</template>

<script>
import PlaceMainInfo from "@/profiles_views/PlaceMainInfo";
import AddedImage from "@/profiles_views/AddedImage";
import NoInfoError from "@/profiles_views/NoInfoError";
import Concerts from "@/profiles_views/Concerts";
import EditPlace from "@/pop-up_views/EditPlace";
import Description from "@/profiles_views/Description";
import Footer from "@/components/Footer";
import AboutUs from "@/pop-up_views/AboutUs";
import Header from "@/components/Header";
import AddConcert from "@/pop-up_views/AddConcert";
import Login from "@/pop-up_views/Login";
import Registration from "@/pop-up_views/Registration";
import moment from "moment";
export default {
  props: ["id", "token"],
  components: {
    AddedImage,
    PlaceMainInfo,
    NoInfoError,
    Description,
    Concerts,
    EditPlace,
    Description,
    Footer,
    AboutUs,
    Header,
    AddConcert,
    Login,
    Registration,
  },
  data() {
    return {
      place: {},
      concerts: [],
      noConcerts: "У вас пока нет концертов. Добавьте информацию о них.",
      noImages: "У вас нет добавленных фото.",
      noDescription: "Отсутсвует информация о вас.",
      isEditPopupVisible: false,
      isAboutUsVidible: false,
      isAddConcertPopupVisible: false,
      edittedConcert: null,
      isLoginVisible: false,
      isRegistrationVidible: false,
    };
  },
  mounted() {
    fetch("https://webcreator.pythonanywhere.com/users/place/details/" + this.id + "/")
      .then((response) => response.json())
      .then((json) => {
        this.place = json;
      });

    fetch("https://webcreator.pythonanywhere.com/concert/")
      .then((response) => response.json())
      .then((json) => {
        this.concerts = json.filter((concert) => {
          return (
            moment(concert.date, "YYYY-MM-DD HH:mm:ss").toDate().getTime() >
              new Date().getTime() && concert.place.id == this.id
          );
        });
      });
  },
  methods: {
    descriptionIsEmpty() {
      return this.place.description === null || this.place.description === "";
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
    showAddConcertPopup() {
      if (this.token !== undefined) {
        this.isAddConcertPopupVisible = true;
      }
    },
    closeAddConcertPopup() {
      this.isAddConcertPopupVisible = false;
      this.edittedConcert = null;
    },
    closeAndRefreshAddConcertPopup() {
      this.closeAddConcertPopup();
      document.location.reload();
    },
    async getConcerts() {
      await fetch("https://webcreator.pythonanywhere.com/concert/")
        .then((response) => response.json())
        .then((json) => {
          this.concerts = json.filter((concert) => {
            return concert.place.id === this.id;
          });
        });
    },
    editConcert(concert) {
      this.edittedConcert = concert;
      this.showAddConcertPopup();
    },
    checkLogging() {
      if (this.$route.path.includes("group")) {
        return true;
      } else {
        return this.token !== undefined;
      }
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

.container_title,
.concerts_title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
}

.container_title {
  width: 1100px;
}

.concerts_title {
  width: 1075px;
}

.add_concert {
  margin-top: 10px;
  width: 25px;
  height: 25px;
}

#concerts_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.concert_header {
  display: flex;
  align-items: center;
  justify-content: center;
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

.edit_link {
  font-size: 20px;
  color: grey;
  font-style: italic;
  text-decoration: underline;
}
</style>
