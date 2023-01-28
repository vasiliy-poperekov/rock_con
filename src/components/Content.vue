<template>
  <div>
    <Header
      v-bind:page_was_replaced="checkReplace()"
      v-on:openProfile="openProfile"
      v-on:setSearchLine="this.setSearchLine"
    />
    <div class="page_container">
      <Login
        v-if="isLoginVisible"
        v-on:closeLogin="closeLogin"
        v-on:show-registration="showRegistration"
        v-on:openGroupProfile="openGroupProfile"
        v-on:openPlaceProfile="openPlaceProfile"
      />
      <AboutUs v-if="isAboutUsVidible" v-on:closeAboutUs="closeAboutUs" />
      <Registration
        v-if="isRegistrationVidible"
        v-on:closeRegistration="closeRegistration"
      />
      <div>
        <div id="calendary_container">
          <div id="calendary">
            <p id="month">{{ this.months[this.currentMonth] }}</p>
            <div id="days_container">
              <img
                class="arrow"
                src="@/assets/left-arrow.png"
                @click="previosMonth()"
                v-if="this.currentMonth > new Date().getMonth()"
              />
              <Days
                v-for="(day, index) in days"
                v-bind:key="index"
                v-bind:day="day"
                v-bind:choosenDay="choosenDay"
                v-on:setChoosenDay="setChoosenDay"
                v-bind:month="currentMonth"
              />
              <img
                class="arrow"
                src="@/assets/right-arrow.png"
                @click="nextMonth()"
                v-if="this.currentMonth < 11"
              />
            </div>
          </div>
        </div>
        <div id="concerts_container">
          <div id="concerts">
            <Cards
              v-for="concert of search()"
              v-bind:concert="concert"
              v-bind:key="concert.id"
            />
            <h1 v-if="search().length === 0">Концертов пока нет :(</h1>
          </div>
        </div>
      </div>
    </div>
    <Footer
      v-on:show-login="showPopupLogin"
      v-on:show-about_us="showAboutUs"
      v-bind:isRedirectedPage="checkReplace()"
    />
  </div>
</template>

<script>
import Days from "@/components/Days";
import Cards from "@/components/Cards";
import Login from "@/pop-up_views/Login";
import AboutUs from "@/pop-up_views/AboutUs";
import Registration from "@/pop-up_views/Registration";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import moment from "moment";
export default {
  props: ["id", "token"],
  components: {
    Days,
    Cards,
    Login,
    AboutUs,
    Registration,
    Footer,
    Header,
  },
  data() {
    return {
      concerts: [],
      isLoginVisible: false,
      isAboutUsVidible: false,
      isRegistrationVidible: false,
      searchedLine: "",

      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      days: 0,

      choosenDay: 0,
      currentMonth: 0,

      choosenDate: null,
    };
  },
  mounted() {
    fetch("https://webcreator.pythonanywhere.com/concert/")
      .then((response) => response.json())
      .then((json) => {
        this.concerts = json.filter((concert) => {
          return (
            moment(concert.date, "YYYY-MM-DD HH:mm:ss").toDate().getTime() >
            new Date().getTime()
          );
        });
      });

    this.currentMonth = new Date().getMonth();
    this.days = new Date(new Date().getFullYear(), this.currentMonth + 1, 0).getDate();
  },
  methods: {
    showPopupLogin() {
      this.isLoginVisible = true;
    },
    showAboutUs() {
      this.isAboutUsVidible = true;
    },
    showRegistration() {
      this.isRegistrationVidible = true;
    },
    closeLogin() {
      this.isLoginVisible = false;
    },
    closeAboutUs() {
      this.isAboutUsVidible = false;
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
    checkReplace() {
      let type = this.$route.path.substring(
        this.$route.path.indexOf("/") + 1,
        this.$route.path.indexOf("/") + 2
      );
      return type === "g" || type === "p";
    },
    openProfile() {
      if (
        this.$route.path.substring(
          this.$route.path.indexOf("/") + 1,
          this.$route.path.indexOf("/") + 2
        ) === "g"
      ) {
        this.openGroupProfile(this.id, this.token);
      } else {
        this.openPlaceProfile(this.id, this.token);
      }
    },
    setSearchLine(searchLine) {
      this.searchedLine = searchLine;
    },
    search() {
      return this.concerts.filter((concert) => {
        return (
          this.checkChoosenDate(concert) &&
          (concert.group.name.toLowerCase().includes(this.searchedLine.toLowerCase()) ||
            concert.place.name.toLowerCase().includes(this.searchedLine.toLowerCase()))
        );
      });
    },
    setChoosenDay(day) {
      this.choosenDay = day;
      this.choosenDate = new Date();
      this.choosenDate.setDate(this.choosenDay);
      this.choosenDate.setMonth(this.currentMonth);
      this.choosenDate.setHours(0, 0, 0, 0);
      this.search();
    },
    nextMonth() {
      if (this.currentMonth < 11) {
        this.currentMonth += 1;
        this.days = new Date(
          new Date().getFullYear(),
          this.currentMonth + 1,
          0
        ).getDate();
        this.choosenDay = 0;
      }
    },
    previosMonth() {
      if (this.currentMonth > 0) {
        this.currentMonth -= 1;
        this.days = new Date(
          new Date().getFullYear(),
          this.currentMonth + 1,
          0
        ).getDate();
        this.choosenDay = 0;
      }
    },
    checkChoosenDate(concert) {
      if (this.choosenDate != null) {
        return (
          moment(concert.date, "YYYY-MM-DD").toDate().getTime() ===
          moment(this.choosenDate, "YYYY-MM-DD").toDate().getTime()
        );
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.page_container {
  position: relative;
  min-height: 80vh;
}

#calendary_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#calendary {
  width: 1100px;
  height: 120px;
  margin: 0;
}

#month {
  width: 1100px;
  height: 30px;
  font-size: 20px;
  padding: 0;
  margin: 0;
}

#concerts_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#concerts {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

#days_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow {
  width: 30px;
  height: 30px;
}
</style>
