<template>
  <div>
    <b-container class="">
      <b-card class="text-center steps__card overflow-hidden">
        <!-- Stepper -->
        <div class="stepper m-4">
          <div class="stepper__progress"></div>
          <div
            class="stepper__progress-active"
            :style="{ width: progressLength + '%' }"
          ></div>
          <div class="stepper__box" v-for="step in steps" :key="step.title">
            <div class="stepper__box-icon">
              <b-icon
                :icon="step.icon"
                class="rounded-circle p-2"
                :class="[
                  step.isFilled
                    ? 'icon-filled'
                    : step.isActive
                    ? 'icon-active'
                    : 'border icon-disabled icon-events-none',
                  isSurveyComplete ? 'icon-events-none' : '',
                ]"
                font-scale="4"
                variant="light"
                @click="goToStep(step)"
              ></b-icon>
            </div>
            <div
              class="stepper__box-title"
              :class="[
                step.isActive
                  ? 'text-primary font-weight-bold'
                  : step.isFilled
                  ? 'text-primary'
                  : 'text-muted',
              ]"
            >
              {{ step.title }}
            </div>
          </div>
        </div>
        <!-- Personal data -->
        <transition
          :enter-active-class="enterAnimation"
          :leave-active-class="leaveAnimation"
          mode="out-in"
        >
          <div v-if="currentStep.type == 1" key="personal-data">
            <validation-observer ref="observer">
              <b-form @submit.stop.prevent="onNextButtonClick">
                <b-container class="text-left mt-4">
                  <b-row>
                    <b-col sm="12">
                      <!-- Name -->
                      <survey-input-field
                        id="name"
                        label="Nome"
                        rules="required"
                        type="text"
                        v-model="survey.firstName"
                      />
                    </b-col>
                    <!-- Surname -->
                    <b-col sm="12">
                      <survey-input-field
                        id="surname"
                        label="Cognome"
                        rules="required"
                        type="text"
                        v-model="survey.lastName"
                      />
                    </b-col>
                    <!-- Fiscal code -->
                    <b-col sm="12">
                      <survey-input-field
                        id="fiscal-code"
                        label="Codice fiscale / Partita IVA"
                        type="text"
                        v-model="survey.fiscalCode"
                        :rules="{
                          required: true,
                          min: 11,
                          regex: /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/,
                        }"
                        vMaskRule="XXXXXXXXXXXXXXXX"
                      />
                    </b-col>
                    <!-- Email -->
                    <b-col sm="12">
                      <survey-input-field
                        id="email"
                        label="Email"
                        rules="required|email"
                        type="email"
                        v-model="survey.email"
                      />
                    </b-col>
                    <!-- Phone -->
                    <b-col sm="12">
                      <survey-input-field
                        id="phone"
                        label="Telefono"
                        rules="required"
                        type="tel"
                        v-model="survey.phone"
                        vMaskRule="############"
                      />
                    </b-col>
                    <!-- Role -->
                    <b-col sm="12">
                      <survey-drop-down-field
                        id="role"
                        label="Qualifica"
                        rules="required"
                        otherOptionValue="c"
                        v-model="survey.asA"
                      />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container class="mt-3 mb-3 text-right">
                  <div class="row">
                    <div class="col">
                      <b-button variant="primary" type="submit" size="lg"
                        >Avanti
                      </b-button>
                    </div>
                  </div>
                </b-container>
              </b-form>
            </validation-observer>
          </div>
          <!-- Building data -->
          <div v-if="currentStep.type == 2" key="building-data">
            <validation-observer ref="observer">
              <b-form @submit.stop.prevent="onNextButtonClick">
                <b-container class="text-left mt-4">
                  <b-row>
                    <!-- Beneficiary -->
                    <b-col sm="12">
                      <survey-drop-down-field
                        id="recipient"
                        label="Il beneficiario del SUPERBONUS sarà"
                        rules="required"
                        v-model="survey.beneficiary"
                      />
                    </b-col>
                    <!-- Building type -->
                    <b-col sm="12">
                      <survey-drop-down-field
                        id="buildingType"
                        label="Indichi la tipologia di edificio che sarà oggetto dell'intervento"
                        rules="required"
                        v-model="survey.buildingType"
                      />
                    </b-col>
                    <!-- Intervention type -->
                    <b-col sm="12">
                      <survey-drop-down-field
                        id="interventionType"
                        label="Indichi la tipologia di intervento"
                        rules="required"
                        v-model="survey.maintenanceWorkKind"
                      />
                    </b-col>
                    <!-- Energy Performance Certificate -->
                    <b-col sm="12">
                      <survey-radio-field
                        id="energyCertificate"
                        label="Si dispone già dell'Attestato di Prestazione Energetica (APE) dell'immobile?"
                        rules="required"
                        v-model="survey.hasEnergyPerformanceCertificate"
                      />
                    </b-col>
                    <!-- Building energetic class -->
                    <b-col sm="12">
                      <survey-drop-down-field
                        id="builiding-energetic-class"
                        label="Qual è la classe energetica dell'immobile?"
                        rules="required"
                        v-model="survey.energyClass"
                      />
                    </b-col>
                    <!-- Energetic riqualification projecft -->
                    <b-col sm="12">
                      <survey-radio-field
                        id="energetic-riqualification-project"
                        label="E' già stato prodotto il progetto di riqualificazione energetica?"
                        rules="required"
                        v-model="survey.hasEnergyRedevelopmentProject"
                      />
                    </b-col>
                    <!-- Suppliers quotes -->
                    <b-col sm="12">
                      <survey-radio-field
                        id="suppliers-quotes"
                        label="Sono già stati raccolti i preventivi dai fornitori?"
                        rules="required"
                        v-model="survey.hasSupplierQuotes"
                      />
                    </b-col>
                    <!-- Intervention cost -->
                    <b-col sm="12">
                      <survey-input-field
                        id="intervention-cost"
                        label="Fornire una stima del costo dell'intervento."
                        :isRequired="false"
                        type="text"
                        v-model="survey.estimatedCost"
                        :vMoneyRule="{
                          decimal: ',',
                          thousands: '.',
                          prefix: '€ ',
                          precision: 0,
                        }"
                        vMaskRule="##########"
                      />
                    </b-col>
                    <!-- Works are already started -->
                    <b-col sm="12">
                      <survey-radio-field
                        id="works-already-started"
                        label="Ha già avviato i lavori di riqualificazione energetica?"
                        rules="required"
                        v-model="survey.isWorkStarted"
                      />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container class="mt-3 mb-3 text-right">
                  <b-row>
                    <b-col>
                      <b-button class="d-none"></b-button>
                      <b-button
                        variant="outline-secondary"
                        size="lg"
                        class="mr-3"
                        :disabled="isSaveInProgress"
                        @click="onGoBackButtonClick(1)"
                        >Indietro</b-button
                      >
                      <b-button
                        variant="primary"
                        type="submit"
                        size="lg"
                        :disabled="isSaveInProgress"
                      >
                        <b-spinner v-if="isSaveInProgress"></b-spinner>
                        Conferma
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-form>
            </validation-observer>
          </div>
          <!-- Confirm -->
          <div v-if="currentStep.type == 3" key="confirm">
            <validation-observer ref="observer">
              <b-form @submit.stop.prevent="onNextButtonClick">
                <b-container class="p-4 container__confirm">
                  <b-row>
                    <b-col>
                      <b-icon
                        icon="envelope"
                        class="text-primary container__confirm-icon mb-4"
                        font-scale="4"
                      ></b-icon>
                      <p class="container__confirm-text h5">
                        Grazie per aver completato le informazioni, riceverai
                        nelle prossime ore la guida direttamente al tuo
                        indirizzo di posta.
                      </p></b-col
                    >
                  </b-row>
                  <b-row class="mt-4">
                    <b-col>
                      <b-button variant="primary" size="lg" type="submit">
                        Nuovo sondaggio
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-form>
            </validation-observer>
          </div>
        </transition>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

/** Import models */
import { Defaults } from '@/models/Defaults';
import { Questionnaire } from '../models/Questionnaire';
import { SurveyStep } from '../models/SurveyStep';
import { SurveyStepType } from '../models/enums/SurveyStepType';

/** Import helpers */
import { CacheHelper } from '../helpers/CacheHelper';

/** Import services */
import { QuestionnaireService } from '../services/QuestionnaireService';

/** Import components */
import SurveyDropDownField from '../components/SurveyDropDownField.vue';
import SurveyInputField from '../components/SurveyInputField.vue';
import SurveyRadioField from '../components/SurveyRadioField.vue';

/** Import v-money utils */
import { unformat } from '../helpers/utils';

/** Import vee-validate rules */
import { extend } from 'vee-validate';
import { required, email, regex, min } from 'vee-validate/dist/rules';
import { EnergyClassType } from '@/models/enums/EnergyClassType';
import { BuildingType } from '@/models/enums/BuildingType';
import { WorkflowStatusType } from '@/models/enums/WorkflowStatusType';

extend('required', required);
extend('email', email);
extend('regex', regex);
extend('min', min);


@Component({
  components: {
    SurveyDropDownField,
    SurveyInputField,
    SurveyRadioField
  }
})
export default class SurveySteps extends Vue {
  /** The questionnaire object */
  private survey: Questionnaire = new Questionnaire();
  /** Indicates if the terms are accepted or not */
  private areTermsAccepted = false;
  /** The list of steps */
  private steps: SurveyStep[] = [
    {
      isActive: true,
      isFilled: false,
      icon: 'person',
      title: 'Anagrafica',
      type: SurveyStepType.PersonalData
    },
    {
      isActive: false,
      isFilled: false,
      icon: 'house',
      title: 'Dati immobile',
      type: SurveyStepType.BuildingData
    },
    {
      isActive: false,
      isFilled: false,
      icon: 'check2',
      title: 'Conferma',
      type: SurveyStepType.End
    },
  ];
  /** Indicates the current survey  */
  private currentStep: SurveyStep = this.steps[0];
  /** Indicates the previous step */
  private previousStep: SurveyStep = this.steps[0];
  /** Indicates if the save is in progress */
  private isSaveInProgress = false;
  /** Indicates if the survey is complete or not */
  private isSurveyComplete = false;

  /** The current step index */
  private get currentStepIndex() {
    return this.steps.indexOf(this.currentStep);
  }

  /** The active progress length  */
  private get progressLength() {
    return ((this.currentStepIndex + 1) / this.steps.length) * 100 - 100 / this.steps.length / 2;
  }

  /** The enter animation */
  private get enterAnimation() {
    if (this.currentStep.type < this.previousStep.type) {
      return "animate__animated animate__fadeInLeft animate__faster";
    } else {
      return "animate__animated animate__fadeInRight animate__faster";
    }
  }

  /** The leave animation */
  private get leaveAnimation() {
    if (this.currentStep.type > this.previousStep.type) {
      return "animate__animated animate__fadeOutLeft animate__faster";
    } else {
      return "animate__animated animate__fadeOutRight animate__faster";
    }
  }

  /**
   * Vue lifecycle event
   */
  private created() {
    // Check if exists a survey in cache
    this.survey = CacheHelper.getItem<Questionnaire | null>(Defaults.surveyLocalStorageName) || new Questionnaire();
    // Check if exists a "steps" in cache 
    const steps = CacheHelper.getItem<SurveyStep[]>(Defaults.surveyStepsLocalStorageName);
    if (steps) {
      this.steps = steps;
      const activeStep = this.steps.find((x: SurveyStep) => x.isActive);
      if (activeStep)
        this.changeActiveStep(activeStep);
      else
        this.changeActiveStep(this.steps[0]);
    }
  }

  /**
   * Fires on previous button click
   */
  private async onGoBackButtonClick() {
    this.changeActiveStep(this.steps[this.currentStepIndex - 1]);
  }

  /**
   * Fires on next button click
   */
  private async onNextButtonClick() {
    if (await this.validate())
      switch (this.currentStep.type) {
        case SurveyStepType.PersonalData: {

          this.currentStep.isFilled = true;
          this.changeActiveStep(this.steps[this.currentStepIndex + 1])
          break;
        }
        case SurveyStepType.BuildingData: {
          const result = await this.saveSurvey();
          if (result) {
            this.isSurveyComplete = true;
            this.currentStep.isFilled = true;

            this.changeActiveStep(this.steps[this.currentStepIndex + 1]);
            this.currentStep.isFilled = true;

            // Remove cache variables
            CacheHelper.removeItem(Defaults.surveyLocalStorageName);
            CacheHelper.removeItem(Defaults.surveyStepsLocalStorageName);
          }
          break;
        }
        case SurveyStepType.End: {
          this.initializeSurvey();
          break;
        }
      }
  }

  /**
   * Scroll the cursor to the top (for mobile)
   */
  private scrollToTop() {
    if (window.scrollY > 0)
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 500);
  }

  private sleep = (m: any) => new Promise(r => setTimeout(r, m))

  /**
   * Save the current survey
   */
  private async saveSurvey(): Promise<boolean> {
    this.isSaveInProgress = true;
    this.survey.workflowStatus = WorkflowStatusType.Submitted;

    const questionnaireService = new QuestionnaireService();
    questionnaireService.create(this.survey);

    await this.sleep(3000)
    this.isSaveInProgress = false;

    return true;
  }

  /**
   * Validate the fields in the current step
   */
  private async validate() {
    const el: any = this.$refs.observer;
    const isValid = await el.validate();

    if (!isValid) {
      // Set the  fo
      let element: any = document.getElementsByClassName('form-control is-invalid')[0];

      if (!element)
        element = document.getElementsByClassName('custom-select is-invalid')[0];

      if (element)
        element.focus();
      else {
        element = document.getElementsByClassName('is-invalid')[0];
        element.scrollIntoView();
      }
    }
    return isValid;
  }

  /**
   * Go to a specific step
   */
  private async goToStep(step: SurveyStep) {
    if (!this.isSurveyComplete && step.type < this.currentStep.type || await this.validate()) {

      this.changeActiveStep(step);
      this.currentStep.isFilled = false;
    }
  }

  /**
   * Change the active step
   */
  private changeActiveStep(newStep: SurveyStep) {
    this.currentStep.isActive = false;
    this.previousStep = JSON.parse(JSON.stringify(this.currentStep));

    this.currentStep = newStep;
    this.currentStep.isActive = true;

    CacheHelper.setItem(Defaults.surveyStepsLocalStorageName, this.steps);

    this.scrollToTop();
  }

  /**
   * Reset the survey with initial data
   */
  private initializeSurvey() {
    this.survey = new Questionnaire();
    this.isSurveyComplete = false;

    this.steps.forEach((step: SurveyStep) => {
      step.isActive = false;
      step.isFilled = false;
    });

    this.currentStep = this.steps[0];
    this.previousStep = this.steps[0];

    this.currentStep.isActive = true;
  }

  /** Listen to survey property change for update cache variable */
  @Watch('survey', { deep: true }) onSurveyChanged(value: Questionnaire) {
    CacheHelper.setItem(Defaults.surveyLocalStorageName, value);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/main.scss";

.form-control.is-invalid:focus {
  box-shadow: none !important;
}

.steps__card {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.stepper {
  display: flex;
  position: relative;

  &__progress,
  &__progress-active {
    height: 2px;
    position: absolute;

    top: 38%;
  }

  &__progress {
    border-bottom: 1px solid #ccc;
    width: 100%;
  }

  &__progress-active {
    width: 20%;
    border-bottom: 3px solid $primary;
    transition: all 2s;
  }

  &__box {
    flex: 1;
    flex-grow: 1;
    z-index: 10;
  }

  .icon-filled {
    color: $white !important;
    background-color: $primary;
    transition: all 0.5s;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: $primary !important;
      background-color: $white !important;
      border: 3px solid $primary;
    }
  }

  .icon-disabled {
    color: #dfe1e2 !important;
    background-color: $white;
  }

  .icon-events-none {
    pointer-events: none;
    cursor: default;
  }

  .icon-active {
    background-color: $white;
    border: 3px solid $primary !important;
    color: $primary !important;
  }
}

.container__confirm {
  padding: 5rem 6rem !important;

  &-icon {
    font-size: 600% !important;
  }
}

.card {
  border: none;
  box-shadow: 0px 0px 20px 1px #d4d0d0;
}

.container {
  max-width: 960px;
}

.spinner-border {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: lg )) {
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: md )) {
}

@media only screen and (max-width: map-get($map: $container-max-widths, $key: sm )) {
  .steps__card {
    margin-bottom: 0 !important;
  }

  .card {
    border: none;
    box-shadow: none;
  }

  .card-body {
    padding: 0;
  }

  .container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .stepper {
    margin: 0 !important;
  }

  .container__confirm {
    padding: 5rem 0rem !important;
  }
}
</style>
