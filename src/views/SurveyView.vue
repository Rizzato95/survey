<template>
  <div>
    <div v-if="!isSurveyVisible" class="text-center">
      <b-container class="survey__logos mt-4">
        <b-row>
          <b-col align-self="center">
            <b-img src="../assets/logo-revaluta.png" class="logo-img mr-3" />
            <b-img src="../assets/logo-unicredit.png" class="logo-img" />
          </b-col>
        </b-row>
      </b-container>
      <!-- Intro -->
      <div>
        <b-container class="survey__intro">
          <b-row>
            <b-col>
              <h1 class="survery__intro-title">
                Green110 - Superbonus Revaluta
              </h1>
            </b-col>
          </b-row>
          <b-row class="w-80">
            <b-col>
              <b-img
                fluid
                src="../assets/workers.jpg"
                class="survey__intro-workers"
              />
            </b-col>
          </b-row>
        </b-container>
        <b-container>
          <div class="row">
            <div class="col">
              <b-form-checkbox
                id="checkbox"
                v-model="areTermsAccepted"
                name="checkbox-1"
              >
                Per poter proseguire confermare la presa visione
                dell'informativa sul trattamento dei dati.
              </b-form-checkbox>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b-link href="https://www.warranthub.it/privacy/" target="__blank"
                >Mostrare i termini</b-link
              >
            </div>
          </div>
        </b-container>
        <b-container class="mt-4">
          <div class="row">
            <div class="col">
              <span id="confirm-step-1">
                <b-button
                  variant="outline-primary"
                  size="lg"
                  :disabled="!areTermsAccepted"
                  @click="startSurvey"
                  >Avanti</b-button
                >
              </span>
              <b-tooltip v-if="!areTermsAccepted" target="confirm-step-1">
                Per proseguire è necessario confermare la presa visione
                dell'informativa sul trattamento dei dati.
              </b-tooltip>
            </div>
          </div>
        </b-container>
      </div>
    </div>
    <div v-else>
      <b-container class="text-center survey__logos mt-4">
        <b-row>
          <b-col align-self="center">
            <b-img src="../assets/logo-revaluta.png" class="logo-img mr-3" />
            <b-img src="../assets/logo-unicredit.png" class="logo-img" />
          </b-col>
        </b-row>
      </b-container>
      <SurveySteps />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

/** Import models */
import { Survey } from '../models/Survey';
import { SurveyStepType } from '../models/SurveyStepType';

import SurveySteps from '../components/SurveySteps.vue';

/** Import v-money utils */
import { unformat } from '../helpers/utils';

@Component({
  components: {
    SurveySteps
  }
})
export default class SurveyView extends Vue {
  /** The survey object*/
  private localSurvey: Survey = new Survey();
  /** Indicates if the terms are accepted or not */
  private areTermsAccepted = false;
  /** Indicates if the terms are accepted or not */
  private isSurveyVisible = false;

  private startSurvey() {
    this.isSurveyVisible = true;
  }

  private async saveData(): Promise<boolean> {
    let result = false;
    await setTimeout(() => {
      result = true;
    }, 1000);

    return result;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/main.scss";

.logo-img {
  height: 60px;
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: lg )) {
  .logo-img {
    height: 60px;
  }
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: md )) {
  .logo-img {
    height: 50px;
  }
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: sm )) {
  .logo-img {
    height: 35px;
  }
}
</style>