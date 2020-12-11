<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title color="primary">Search</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          debounce="500"
          placeholder="Search drink"
          @ionChange="fetchSearchResults($event.detail.value)"
        >
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="loading">
      <div class="center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <div class="center no-results" v-if="searchResults && searchResults.length === 0">
        <ion-label>No Results</ion-label>
      </div>

      <ion-grid>
        <transition-group
          tag="ion-row"
          enter-active-class="animate__animated animate__fadeIn"
        >
          <ion-col
            v-show="!showAnimation"
            size="12"
            size-sm="6"
            size-lg="4"
            v-for="drink in searchResults"
            :key="drink.idDrink"
          >
            <drink-card :cockTail="drink"></drink-card>
          </ion-col>
        </transition-group>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { reactive, toRefs } from "vue";
import axios from "axios";
import DrinkCard from "@/components/DrinkCard.vue";

export default {
  name: "Tab3",
  components: {
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSpinner,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    /* My Components */
    DrinkCard,
  },
  setup() {
    const state = reactive({
      searchResults: [],
      loading: false,
      showAnimation: true,
    });

    const fetchSearchResults = async (searchTerm) => {
      state.loading = true;

      if (searchTerm) {
        const res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );

        state.showAnimation = true;
        if (res.data) {
          let data = res.data.drinks;

          if (data && data.length !== 0) {
            /* Wrap properties */
            data.map((obj) => {
              obj["measureIngredients"] = [];
              for (let number = 1; number <= 15; number++) {
                obj.measureIngredients.push({
                  ingredient: obj[`strIngredient${number}`],
                  measure: obj[`strMeasure${number}`],
                });
              }
            });

            state.searchResults = data;
          }
        }
      }

      state.loading = false;
      setTimeout(() => {
        state.showAnimation = false;
      }, 200);
    };

    return {
      /* Data */
      ...toRefs(state),
      /* Functions */
      fetchSearchResults,
    };
  },
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

ion-spinner {
  transform: scale(1.5);
}

.no-results {
  text-align: center;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  position: fixed;
}
.no-results ion-label {
  font-size: 18px;
  line-height: 22px;
  opacity: 0.5;
}
</style>
