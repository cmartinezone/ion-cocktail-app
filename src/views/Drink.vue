<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title color="primary">{{ state.drink.strDrink }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <drink-card :cockTail="state.drink"></drink-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
} from "@ionic/vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import DrinkCard from "@/components/DrinkCard.vue";

export default {
  name: "drink",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSpinner,

    /* My Components */
    DrinkCard,
  },
  setup() {
    const route = useRoute();
    const drinkId = route.params.drinkId;

    const state = reactive({
      drink: {},
      loading: false,
    });

    const fetchDrinkById = async (drinkId) => {
      state.loading = true;
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
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
        state.drink = data;
      }
      state.loading = false;
    };

    fetchDrinkById(drinkId);

    return {
      /* Data */
      state,
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

ion-spiner {
  transform: scale(1.5);
}
</style>
