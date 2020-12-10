<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title color="primary">{{ ingredient }} Drinks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <transition-group
        tag="ion-list"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <ion-item
          v-show="!state.showAnimation"
          :button="true"
          v-for="drink in state.lstDrinks"
          :key="drink.idDrink"
          @click="
            $router.push({
              name: 'drink',
              params: { drinkId: drink.idDrink },
            })
          "
        >
          <ion-avatar slot="start">
            <img :src="drink.strDrinkThumb" />
          </ion-avatar>
          <ion-label>
            <h2>
              {{ drink.strDrink }}
            </h2>
          </ion-label>
        </ion-item>
      </transition-group>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonRouter,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "DrinksByIngredient",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    useIonRouter,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonButtons,
    IonBackButton,
  },
  setup(props) {
    const route = useRoute();

    const ingredient = route.params.ingredient;

    const state = reactive({
      lstDrinks: [],
      loading: false,
      showAnimation: true,
    });

    const fetchDrinkByEngredient = async (ingredient) => {
      state.loading = true;

      const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      if (res.data) {
        const data = res.data.drinks;

        state.lstDrinks = data;
      }

      state.loading = false;
      setTimeout(() => {
        state.showAnimation = false;
      }, 200);
    };

    fetchDrinkByEngredient(ingredient);

    return {
      /* Data */
      state,
      ingredient,
      /* functions */
      fetchDrinkByEngredient,
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
</style>
