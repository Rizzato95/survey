<template>
  <b-container fluid>
    <grid id="menus" entityName="menuItems" />
  </b-container>
</template>

<script lang="ts">
/** Import vue property decorator */
import { Vue, Component } from 'vue-property-decorator';

/** Import models */

/** Import helpers */

/** Import components */
import Grid from '../../components/Grid.vue';

@Component({
  components: {
    Grid
  }
})
export default class AdminView extends Vue {
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/main.scss";
</style>