<template>
  <ion-card>
    <img :src="cockTail.strDrinkThumb" />

    <ion-card-header>
      <ion-card-subtitle
        >{{ cockTail.strCategory }} | Served In {{ cockTail.strGlass }}</ion-card-subtitle
      >
      <ion-card-title>{{ cockTail.strDrink }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <p>{{ cockTail.strInstructions }}</p>
      <ion-list-header>Ingredients</ion-list-header>
      <ion-list>
        <div v-for="(item, index) in cockTail.measureIngredients" :key="index">
          <ion-item v-if="item.ingredient && item.measure">
            <ion-label>
              <span v-if="item.measure">
                {{ item.measure }}
              </span>
              {{ item.ingredient }}
            </ion-label>
          </ion-item>
        </div>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonListHeader,
  IonList,
} from "@ionic/vue";

export default {
  name: "DrinkCard",
  components: {
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonListHeader,
    IonList,
  },
  props: {
    cockTail: {
      type: Object,
      required: true,
    },
  },
};
</script>
