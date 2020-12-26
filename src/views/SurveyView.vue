<template>
  <div>
    <div v-if="!isSurveyVisible" class="survey__start">
      <b-container>
        <b-card class="text-center survey__start-card">
          <b-container class="survey__start-logos">
            <b-row>
              <b-col align-self="center">
                <b-img
                  src="../assets/logo-revaluta.png"
                  class="logo-img mr-3"
                />
                <b-img src="../assets/logo-unicredit.png" class="logo-img" />
              </b-col>
            </b-row>
          </b-container>
          <b-container class="survey__intro">
            <b-row>
              <b-col>
                <h1 class="survey__intro-title">
                  <span>Green110</span>
                  <span>Superbonus Revaluta</span>
                </h1>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox
                  id="checkbox"
                  v-model="areTermsAccepted"
                  name="checkbox-1"
                >
                  Per poter proseguire confermare la presa visione
                  dell'informativa sul trattamento dei dati.
                </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-link
                  href="https://www.warranthub.it/privacy/"
                  target="__blank"
                  >Mostrare i termini</b-link
                >
              </b-col>
            </b-row>
            <b-row class="mt-4 align-bottom">
              <b-col>
                <span id="confirm-step-1">
                  <b-button
                    variant="primary"
                    class="survey__button"
                    size="lg"
                    :disabled="!areTermsAccepted"
                    @click="startSurvey"
                    >Inizia</b-button
                  >
                </span>
                <b-tooltip v-if="!areTermsAccepted" target="confirm-step-1">
                  Per proseguire è necessario confermare la presa visione
                  dell'informativa sul trattamento dei dati.
                </b-tooltip>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-container>
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
}
</script>

<style lang="scss" scoped>
@import "../assets/style/main.scss";

.survey__start {
  background-image: linear-gradient(to right bottom, $primary, $secondary);
  height: 100vh;
  width: 100%;

  &-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
  }

  &-logos {
    margin-top: 1rem;
  }
}

.survey__intro {
  &-title {
    padding: 5rem 0rem;
    color: $primary;

    & > span {
      display: inline-block;
      width: 100%;
    }
  }
}

.logo-img {
  height: 40px;
}

.survey__button {
  padding: 1.5rem 10rem !important;
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: sm )) {
  .card-body {
    padding: 1rem 0rem !important;
  }
  .logo-img {
    height: 35px;
  }

  .survey__start-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }

  .survey__button {
    padding: 1rem 6rem !important;
  }

  .survey__intro {
    &-title {
      padding: 5rem 0rem;
      font-size: 2rem;
      color: $primary;
    }
  }
}
</style>