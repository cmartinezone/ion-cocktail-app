<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title color="primary">Random Drink</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <drink-card
          v-show="!state.showAnimation"
          :cockTail="state.randomCocktail"
        ></drink-card>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonContent,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { reactive } from "vue";

import axios from "axios";
import DrinkCard from "@/components/DrinkCard.vue";

export default {
  name: "Tab1",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonContent,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,

    /* My components */
    DrinkCard,
  },

  setup() {
    const state = reactive({
      randomCocktail: {},
      loading: false,
      showAnimation: true,
    });

    const fetchRandomCocktail = async (dispLoaderPage) => {
      if (dispLoaderPage) {
        state.loading = true;
      }

      state.showAnimation = true;

      const res = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );

      if (res.data) {
        let data = res.data.drinks[0];
        let measureIngredients = [];

        for (let number = 1; number <= 15; number++) {
          measureIngredients.push({
            ingredient: data[`strIngredient${number}`],
            measure: data[`strMeasure${number}`],
          });
        }

        data["measureIngredients"] = measureIngredients;
        state.randomCocktail = data;
      }

      state.loading = false;
      /* For Animation delay */
      setTimeout(() => {
        state.showAnimation = false;
      }, 200);
    };

    const doRefresh = (event) => {
      fetchRandomCocktail(false);
      event.detail.complete();
    };

    fetchRandomCocktail(true);

    return {
      state,
      fetchRandomCocktail,
      doRefresh,
    };
  },
};
</script>

<style scoped>
.loading-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

ion-spinner {
  transform: scale(1.5);
}

/* Search toolbar animation */
/* .animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
} */
</style>
