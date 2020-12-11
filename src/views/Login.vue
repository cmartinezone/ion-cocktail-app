<template>
  <ion-page>
    <ion-content :scrollY="false">
      <div t class="ion-text-center">
        <img class="img" src="assets/having_fun_iais.svg" />
      </div>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div v-if="!showAnimation" class="container">
          <div class="form ion-text-center">
            <h2>Login</h2>
            <ion-item lines="none">
              <ion-input placeholder="Email"></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-input placeholder="Password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              router-link="/tabs/tab1"
              routerDirection="root"
              >Login</ion-button
            >
          </div>
        </div>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";

export default {
  name: "Login",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
  },
  setup() {
    let showAnimation = ref(true);
    setTimeout(() => {
      showAnimation.value = false;
    }, 100);
    return {
      showAnimation,
    };
  },
};
</script>

<style scoped>
ion-content {
}
.container {
  min-height: 300px;
  width: 100%;
  background-color: white;
  bottom: 0;
  position: absolute;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.img {
  height: 180px;
  margin-top: 100px;
}

.form {
  padding: 10px;
}
.form ion-item {
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color: var(--ion-color-primary-shade);
  margin-top: 20px;
}
.form ion-button {
  margin-top: 10px;
}
</style>
