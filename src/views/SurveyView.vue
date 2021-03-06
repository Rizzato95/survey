<template>
  <div>
    <!-- Survey intro -->
    <div v-if="!isSurveyVisible" class="survey__start">
      <transition appear name="fade">
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
      </transition>
    </div>
    <!-- Survey Steps -->
    <div v-else>
      <transition appear name="fade">
        <SurveySteps />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
/** Import vue property decorator */
import { Vue, Component } from 'vue-property-decorator';

/** Import models */
import { Defaults } from '@/models/Defaults';
import { Questionnaire } from '@/models/Questionnaire';

/** Import helpers */
import { CacheHelper } from '@/helpers/CacheHelper';
import { unformat } from '../helpers/utils';

/** Import components */
import SurveySteps from '../components/SurveySteps.vue';

@Component({
  components: {
    SurveySteps
  }
})
export default class SurveyView extends Vue {
  /** Indicates if the terms are accepted or not */
  private areTermsAccepted = false;
  /** Indicates if the terms are accepted or not */
  private isSurveyVisible = false;

  /**
   * Vue lifecycle event
   */
  private created() {
    const survey = CacheHelper.getItem<Questionnaire>(Defaults.surveyLocalStorageName);

    if (survey)
      this.startSurvey();
  }

  /**
   * Start a new survey
   */
  private startSurvey() {
    this.isSurveyVisible = true;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/main.scss";

.survey__start {
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

.survey__button {
  padding: 1.5rem 10rem !important;
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: sm )) {
  .card-body {
    padding: 1rem 0rem !important;
  }
  .logo-img {
    height: 30px;
  }

  .survey__start-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 2rem);
  }

  .survey__button {
    padding: 1rem 1rem !important;
    display: block;
    width: 100%;
  }

  .survey__intro {
    &-title {
      padding: 3rem 0rem;
      font-size: 2rem;
      color: $primary;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>