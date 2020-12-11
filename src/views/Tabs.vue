<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom" :translucent="true">
        <ion-tab-button tab="random" href="/tabs/tab1">
          <ion-icon :icon="iconWrapper(mdiShuffleVariant)" />
          <ion-label>Random</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="byingredient" href="/tabs/tab2">
          <ion-icon :icon="iconWrapper(mdiFilterVariant)" />
          <ion-label>By ingredient</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/tab3">
          <ion-icon :icon="iconWrapper(mdiMagnify)" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue";

import { mdiShuffleVariant, mdiMagnify, mdiFilterVariant } from "@mdi/js";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    const iconWrapper = (mdiIcon) => {
      let iconTample = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'
     class='ionicon' viewBox="0 0 24 24"><path d='${mdiIcon}'/></svg>`;
      return iconTample;
    };

    return {
      /* Functions */
      iconWrapper,
      /* Icons */
      mdiShuffleVariant,
      mdiFilterVariant,
      mdiMagnify,
    };
  },
};
</script>
