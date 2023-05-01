<script>
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      doors: ["1", "2", "3"],
      selectedCard: undefined,
      openCard: undefined,
      winningCard: undefined,
      selectedFlag: false,
      winFlag: undefined,
      tries: undefined,
      wins: undefined,
      losses: undefined,
    };
  },
  mounted() {
    if (
      !document.cookie
        .split(";")
        .some((cookie) => cookie.trim().startsWith("stats="))
    ) {
      VueCookies.set("stats", "0;0;0", "7d");
    }
  },
  methods: {
    selectCard(index) {
      if (this.doors[index] != "Kecske" && this.winFlag == undefined) {
        this.selectedCard = index;
      }
      if (!this.selectedFlag) {
        this.selectedFlag = true;
        this.winningCard = Math.floor(Math.random() * 3);

        const unselectedCards = [0, 1, 2].filter(
          (card) => card !== this.selectedCard
        );
        const goatCards = unselectedCards.filter(
          (card) => card !== this.winningCard
        );

        this.openCard = goatCards[Math.floor(Math.random() * goatCards.length)];

        this.doors[this.openCard] = "Kecske";
      }
    },
    checkWin() {
      const cookieData = VueCookies.get("stats").split(";");
      console.log(cookieData);

      if (this.selectedCard === undefined) {
        this.winFlag = null;
      } else if (this.selectedCard === this.winningCard) {
        this.doors[this.winningCard] = "Autó";

        this.wins = parseInt(cookieData[1]) + 1;
        this.losses = parseInt(cookieData[2]);
        this.tries = parseInt(cookieData[0]) + 1;

        VueCookies.set(
          "stats",
          `${this.tries};${this.wins};${this.losses}`,
          "7d"
        );

        this.winFlag = true;
      } else {
        this.doors[this.winningCard] = "Autó";

        this.losses = parseInt(cookieData[2]) + 1;
        this.wins = parseInt(cookieData[1]);
        this.tries = parseInt(cookieData[0]) + 1;

        VueCookies.set(
          "stats",
          `${this.tries};${this.wins};${this.losses}`,
          "7d"
        );

        this.winFlag = false;
      }
    },
    resetGame() {
      Object.assign(this.$data, this.$options.data());
    },
    smoothClick(key) {
      setTimeout(() => {
        if (key === "checkWin") {
          this.checkWin();
        }
        else {
          this.resetGame();
        }
      }, 25);
    }
  },
};
</script>

<template>
  <div class="grid grid-rows-4 h-screen w-screen bg-custom-bg-dark">
    <div class="grid grid-cols-13 row-span-3 w-full h-full">
      <span></span>
      <template
        v-if="winFlag === undefined"
        v-for="(item, index) in doors"
        :key="index"
      >
        <div
          @click="selectCard(index)"
          :class="{
            'bg-emerald-400 hover:bg-emerald-400 cursor-pointer':
              index === selectedCard && winFlag == undefined,
            'bg-yellow-300 hover:bg-yellow-300 cursor-default':
              item === 'Kecske',
            'bg-slate-300 hover:bg-slate-200 cursor-pointer': item !== 'Kecske' && index !== selectedCard,
          }"
          class="elevation-4 col-span-3 h-3/4 mt-auto mb-auto rounded-3xl flex items-center justify-center"
        >
          <h1 class="text-6xl">{{ item }}</h1>
        </div>
        <span></span>
      </template>
      <template v-else v-for="(item, i) in doors" :key="i">
        <div
          :class="{
            'bg-emerald-400 hover:bg-emerald-400':
              i === selectedCard && winFlag == undefined,
            'bg-yellow-300 hover:bg-yellow-300': item === 'Kecske',
            'bg-slate-200 hover:bg-slate-200': item !== 'Kecske' && i !== winningCard,
            'bg-green-600 hover:bg-green-600': item === 'Autó',
          }"
          class="elevation-4 col-span-3 h-3/4 mt-auto mb-auto rounded-3xl flex items-center justify-center"
        >
          <h1 class="text-6xl">{{ item }}</h1>
        </div>
        <span></span>
      </template>
    </div>
    <div class="bg-custom-elevation-2 elevation-4 grid grid-rows-5">
      <div
        class="grid grid-cols-9 text-emerald-700 row-span-2"
        v-if="winFlag === true"
      >
        <div class="col-span-2 grid grid-rows-3 w-full h-full">
          <p class="mt-1 ml-2 text-white">Próbálkozások: {{ this.tries }}</p>
          <p class="mt-1 ml-2">Győztes: {{ this.wins }}</p>
          <p class="mt-1 ml-2 text-red-600">Vesztes: {{ this.losses }}</p>
        </div>
        <span class="col-span-1"></span>
        <h1 class="text-6xl col-span-3 flex items-center justify-center">
          Nyertél!
        </h1>
      </div>
      <div
        class="grid grid-cols-9 text-emerald-700 row-span-2"
        v-else-if="winFlag === false"
      >
        <div class="col-span-2 grid grid-rows-3 w-full h-full">
          <p class="mt-1 ml-2 text-white">Próbálkozások: {{ this.tries }}</p>
          <p class="mt-1 ml-2">Győztes: {{ this.wins }}</p>
          <p class="mt-1 ml-2 text-red-600">Vesztes: {{ this.losses }}</p>
        </div>
        <span class="col-span-1"></span>
        <h1
          class="text-6xl col-span-3 flex items-center justify-center text-red-600"
        >
          Vesztettél!
        </h1>
      </div>
      <span v-if="selectedFlag === false" class="row-span-2"></span>
      <div
        v-if="selectedFlag === false"
        class="flex items-center justify-center"
      >
        <h1 class="text-6xl text-blue-500 drop-shadow-2xl">
          Válassz egy kártyát!
        </h1>
      </div>
      <template v-else>
        <h1 v-if="winFlag === undefined && selectedFlag == true" class="flex items-center justify-center text-6xl text-blue-500 drop-shadow-2xl row-span-2">
          Válassz a két kártya közül!
        </h1>
        <div
          v-if="winFlag === undefined && selectedFlag == true"
          class="flex items-center justify-center row-span-3"
        >
          <button
            @click="smoothClick('checkWin')"
            class="bg-blue-500 px-8 py-4 rounded-2xl text-3xl hover:bg-blue-300 elevation-4 transform active:translate-y-0.5 transition duration-50 active:elevation-1"
          >
            Kiválasztás
          </button>
        </div>
        <div v-else class="flex items-center justify-center row-span-3">
          <button
            @click="smoothClick('resetGame')"
            class="bg-blue-500 px-8 py-4 rounded-2xl text-3xl hover:bg-blue-300 elevation-4 transform active:translate-y-0.5 transition duration-50 active:elevation-1"
          >
            Újra
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
body {
  margin: 0px;
  font-family: "Roboto", sans-serif;
}
</style>
