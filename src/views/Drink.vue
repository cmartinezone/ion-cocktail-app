<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title color="primary">{{ drink.strDrink }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <drink-card v-show="!showAnimation" :cockTail="drink"></drink-card>
      </transition>
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
import { reactive, toRefs } from "vue";
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
      showAnimation: true,
    });

    const fetchDrinkById = async (drinkId) => {
      state.loading = true;
      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );

      if (res.data) {
        let data = res.data.drinks[0];
        data["measureIngredients"] = [];
        for (let number = 1; number <= 15; number++) {
          data.measureIngredients.push({
            ingredient: data[`strIngredient${number}`],
            measure: data[`strMeasure${number}`],
          });
        }
        state.drink = data;
      }

      state.loading = false;
      /* For Animation delay */
      setTimeout(() => {
        state.showAnimation = false;
      }, 200);
    };

    fetchDrinkById(drinkId);

    return {
      /* Data */
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.loading-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

ion-spinner {
  transform: scale(1.5);
}
/* Search toolbar animation */
.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}
</style>
