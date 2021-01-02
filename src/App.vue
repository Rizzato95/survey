<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap");
</style>
<script lang="ts">
/** Import vue property decorator */
import { Component, Vue } from 'vue-property-decorator';

/** Import vuex */
import { mapState } from 'vuex';

/**
 * The app
 */
@Component
export default class App extends Vue {

  /** The application settings */
  private get settings() {
    return this.$store.state.settings;
  }

  async created() {
    document.title = process.env.VUE_APP_TITLE || 'Revaluta green 110';
    await this.settings.initialize();
  }
}
</script>

<style lang="scss">
@import "./assets/style/main.scss";

body {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("./assets/hero.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
}

.logo-img {
  height: 40px;
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: sm )) {
  .logo-img {
    height: 30px;
  }
}
</style>