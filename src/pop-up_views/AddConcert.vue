<template>
  <div class="popup">
    <div class="bottom_layer" @click="closeAddConcertPopup" />
    <div class="adding_container">
      <p class="title">Добавление информации о концерте</p>
      <input
        type="text"
        size="64"
        id="search"
        placeholder="Введите название группы или исполнителя"
        v-model="search"
      />
      <div class="group_cards_container">
        <GroupCard
          v-for="(group, index) of filteredList"
          v-on:clickGroup="clickGroup(group)"
          v-on:clickMore="clickMore(group)"
          v-bind:key="index"
          v-bind:group="group"
          v-bind:isClicked="group.id === groupId"
        />
      </div>
      <DateTimePicker
        v-on:setConcertDate="setConcertDate"
        v-bind:concertDate="this.concertDate"
      />
      <div class="button_container">
        <button
          class="concert_button"
          :style="{ width: this.myButtonWidth + 'px' }"
          @click="save"
        >
          Сохранить
        </button>
        <button
          class="concert_button"
          v-if="this.concert != null && this.concert !== undefined"
          :style="{ width: this.myButtonWidth + 'px' }"
          @click="deleteConcert"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GroupCard from "@/pop-up_views/GroupCard";
import DateTimePicker from "@/pop-up_views/DateTimePicker";
import moment from "moment";
export default {
  props: ["placeId", "concert", "token"],
  methods: {
    closeAddConcertPopup() {
      this.$emit("closeAddConcertPopup");
    },
    closeAndRefreshAddConcertPopup() {
      this.$emit("closeAndRefreshAddConcertPopup");
    },
    async save() {
      if (this.concert === undefined || this.concert == null) {
        if (this.groupId != null && this.concertDate != null) {
          await fetch("https://webcreator.pythonanywhere.com/concert/create/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Token " + this.token,
            },
            body: `{
              "group": ${this.groupId},
              "place": ${this.placeId},
              "date": "${moment(this.concertDate).format("YYYY-MM-DDTHH:mm:ss")}"
            }`,
          });
          this.closeAndRefreshAddConcertPopup();
        } else {
          this.$toasted.show("Выберите группу и дату для концерта!");
        }
      } else {
        await fetch("https://webcreator.pythonanywhere.com/concert/" + this.concert.id + "/", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + this.token,
          },
          body: `{
              "group": ${this.groupId},
              "place": ${this.placeId},
              "date": "${moment(this.concertDate).format("YYYY-MM-DDTHH:mm:ss")}"
            }`,
        });
        this.closeAndRefreshAddConcertPopup();
      }
    },
    setConcertDate(date) {
      this.concertDate = date;
    },
    clickGroup(group) {
      this.groupId = group.id;
    },
    deleteConcert() {
      fetch("https://webcreator.pythonanywhere.com/concert/" + this.concert.id + "/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + this.token,
        },
      });
      this.closeAndRefreshAddConcertPopup();
    },
    clickMore(group) {
      this.$router.push({ path: "/place_group/" + group.id });
    },
  },
  data() {
    return {
      groupsList: [],
      concertDate: null,
      groupId: null,
      search: "",
      myButtonWidth: 380,
    };
  },
  mounted() {
    fetch("https://webcreator.pythonanywhere.com/users/group_singer/")
      .then((response) => response.json())
      .then((json) => {
        this.groupsList = json;
      });
    if (this.concert !== undefined && this.concert != null) {
      this.myButtonWidth = 160;
    }
  },
  beforeMount() {
    if (this.concert !== undefined) {
      this.groupId = this.concert.group.id;
      this.concertDate = moment(this.concert.date, "YYYY-MM-DD HH:mm:ss").toDate();
    }
  },
  components: { GroupCard, DateTimePicker },
  computed: {
    filteredList() {
      return this.groupsList.filter((group) => {
        return group.name.toLowerCase().includes(this.search.toLowerCase());
      });
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
  height: 700px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 15px;
  position: fixed;
  box-shadow: 0 0 3px 0 #6a6a6a;
}

.title {
  width: 450px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-top: 10px;
}

.button_container {
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.concert_button {
  height: 40px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 18px;
  margin-bottom: 10px;
}

#search {
  width: 350px;
  background-color: #b6b6b6;
  border-radius: 35px;
  border: 0;
  outline: none;
  height: 35px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 16px;
}

.group_cards_container {
  width: 450px;
  height: 450px;
  overflow: auto;
}

.group_cards_container::-webkit-scrollbar {
  width: 12px;
  border-radius: 15px;
  background-color: #b7b6b6;
}

.group_cards_container::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 15px;
}
</style>
