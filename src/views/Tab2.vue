<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title color="primary">Search by ingredients</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="loading">
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
          v-show="!showAnimation"
          :button="true"
          v-for="(ingredient, index) in lstIngredients"
          :key="index"
          @click="
            $router.push({
              name: 'drinks-by-ingredient',
              params: { ingredient: ingredient.strIngredient1 },
            })
          "
        >
          <ion-avatar slot="start">
            <img :src="ingredientImage(ingredient.strIngredient1)" />
          </ion-avatar>
          <ion-label>
            <h2>
              {{ ingredient.strIngredient1 }}
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
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
} from "@ionic/vue";
import { reactive, toRefs } from "vue";
import axios from "axios";

export default {
  name: "Tab2",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
  },
  setup() {
    const state = reactive({
      lstIngredients: [],
      loading: false,
      showAnimation: true,
    });

    const fetchIngredients = async () => {
      state.loading = true;

      const res = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
      );

      if (res.data) {
        const data = res.data.drinks;
        data.sort((a, b) => {
          return a.strIngredient1.localeCompare(b.strIngredient1);
        });

        state.lstIngredients = data;
      }

      state.loading = false;
      setTimeout(() => {
        state.showAnimation = false;
      }, 200);
    };

    const ingredientImage = (ingredient) => {
      return `https://www.thecocktaildb.com/images/ingredients/${encodeURI(
        ingredient
      )}-Small.png`;
    };

    fetchIngredients();

    return {
      /* Data */
      ...toRefs(state),
      /* functions */
      fetchIngredients,
      ingredientImage,
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
.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}
</style>
