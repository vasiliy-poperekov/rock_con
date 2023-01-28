<template>
  <div class="popup">
    <div class="bottom_layer" @click="closePlacesPopup" />
    <div class="connect_place_container">
      <p class="title">Выбор места проведения концерта</p>
      <input
        type="text"
        size="64"
        id="search"
        placeholder="Введите название места или адрес"
        v-model="search"
      />
      <div class="places_cards_container">
        <PlaceCard
          v-for="(place, index) of filteredList"
          v-on:clickPlace="clickPlace(place)"
          v-bind:key="index"
          v-bind:place="place"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlaceCard from "@/pop-up_views/PlaceCard";
export default {
  components: { PlaceCard },
  data() {
    return {
      placesList: [],
      search: "",
    };
  },
  mounted() {
    fetch("https://webcreator.pythonanywhere.com/users/place/")
      .then((response) => response.json())
      .then((json) => {
        this.placesList = json;
      });
  },
  methods: {
    clickPlace(place) {
      this.$router.push({ path: "/group_place/" + place.id });
    },
    closePlacesPopup() {
      this.$emit("closePlacesPopup");
    },
    getAddress(place) {
      if (place.address == null) {
        return "";
      } else {
        return place.address;
      }
    },
  },
  computed: {
    filteredList() {
      return this.placesList.filter((place) => {
        return (
          place.name.toLowerCase().includes(this.search.toLowerCase()) ||
          this.getAddress(place).toLowerCase().includes(this.search.toLowerCase())
        );
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

.connect_place_container {
  width: 500px;
  height: 600px;
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

.places_cards_container {
  width: 450px;
  height: 450px;
  overflow: auto;
}

.places_cards_container::-webkit-scrollbar {
  width: 12px;
  border-radius: 15px;
  background-color: #b7b6b6;
}

.places_cards_container::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 15px;
}
</style>
