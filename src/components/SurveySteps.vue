<template>
  <div>
    <b-container>
      <b-card class="text-center mt-4">
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
                  step.isActive
                    ? 'bg-primary'
                    : step.isFilled || step.isStarted
                    ? 'bg-white icon-filled'
                    : 'bg-white border icon-disabled',
                ]"
                font-scale="4"
                variant="light"
                @click="goToStep(step)"
              ></b-icon>
            </div>
            <div class="stepper__box-title">
              {{ step.title }}
            </div>
          </div>
        </div>
        <!-- Personal data -->
        <div v-if="currentStep.type == 1">
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onNextButtonClick)">
              <b-container class="text-left mt-4">
                <b-row>
                  <b-col sm="6">
                    <!-- Name -->
                    <survey-input-field
                      id="name"
                      label="Nome"
                      rules="required"
                      type="text"
                      v-model="survey.name"
                    />
                  </b-col>
                  <!-- Surname -->
                  <b-col sm="6">
                    <survey-input-field
                      id="surname"
                      label="Cognome"
                      rules="required"
                      type="text"
                      v-model="survey.surname"
                    />
                    <!-- Fiscal code -->
                  </b-col>
                  <b-col sm="6">
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
                    <!-- Email -->
                  </b-col>
                  <b-col sm="6">
                    <survey-input-field
                      id="email"
                      label="Email"
                      rules="required|email"
                      type="email"
                      v-model="survey.email"
                    />
                    <!-- Phone -->
                  </b-col>
                  <b-col sm="6">
                    <survey-input-field
                      id="phone"
                      label="Telefono"
                      rules="required"
                      type="tel"
                      v-model="survey.phone"
                      vMaskRule="############"
                    />
                  </b-col>
                  <b-col sm="6">
                    <survey-drop-down-field
                      id="role"
                      label="Qualifica"
                      rules="required"
                      otherOptionValue="c"
                      v-model="survey.role"
                    />
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="mt-4 text-right">
                <b-row>
                  <b-col>
                    <b-button
                      variant="outline-secondary"
                      size="lg"
                      class="mr-3"
                      @click="onGoBackButtonClick(1)"
                      >Indietro</b-button
                    >
                    <b-button variant="primary" type="submit" size="lg"
                      >Avanti
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-form>
          </validation-observer>
        </div>
        <!-- Building data -->
        <div v-if="currentStep.type == 2">
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onNextButtonClick)">
              <b-container class="text-left mt-4">
                <b-row>
                  <b-col sm="6">
                    <!-- Recipient -->
                    <survey-drop-down-field
                      id="recipient"
                      label="Il beneficiario del SUPERBONUS sarà"
                      rules="required"
                      v-model="survey.recipient"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Building type -->
                    <survey-drop-down-field
                      id="buildingType"
                      label="Indichi la tipologia di edificio che sarà oggetto dell'intervento"
                      rules="required"
                      v-model="survey.interventionType"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Intervention type -->
                    <survey-drop-down-field
                      id="interventionType"
                      label="Indichi la tipologia di intervento"
                      rules="required"
                      v-model="survey.buildingType"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Energy Performance Certificate -->
                    <survey-radio-field
                      id="energyCertificate"
                      label="Si dispone già dell'Attestato di Prestazione Energetica (APE) dell'immobile?"
                      rules="required"
                      v-model="survey.hasEnergyPerformanceCertificate"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Building energetic class -->
                    <survey-drop-down-field
                      id="builiding-energetic-class"
                      label="Qual è la classe energetica dell'immobile?"
                      rules="required"
                      v-model="survey.buildingEnergeticClass"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Energetic riqualification projecft -->
                    <survey-radio-field
                      id="energetic-riqualification-project"
                      label="E' già stato prodotto il progetto di riqualificazione energetica?"
                      rules="required"
                      v-model="survey.hasEnergeticRiqualification"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Suppliers quotes -->
                    <survey-radio-field
                      id="suppliers-quotes"
                      label="Sono già stati raccolti i preventivi dai fornitori?"
                      rules="required"
                      v-model="survey.hasSuppliersQuotes"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Intervention cost -->
                    <survey-input-field
                      id="intervention-cost"
                      label="Fornire una stima del costo dell'intervento."
                      :isRequired="false"
                      type="text"
                      v-model="survey.interventionCost"
                      :vMoneyRule="{
                        decimal: ',',
                        thousands: '.',
                        prefix: '€ ',
                        precision: 0,
                        masked: false,
                      }"
                      vMaskRule="##########"
                    />
                  </b-col>
                  <b-col sm="6">
                    <!-- Works are already started -->
                    <survey-radio-field
                      id="works-already-started"
                      label="Ha già avviato i lavori di riqualificazione energetica?"
                      rules="required"
                      v-model="survey.hasStartEnergeticRiqualification"
                    />
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="mt-4 text-right">
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
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

/** Import models */
import { Survey } from '../models/Survey';
import { SurveyStep } from '../models/SurveyStep';
import { SurveyStepType } from '../models/SurveyStepType';

/** Import components */
import SurveyDropDownField from '../components/SurveyDropDownField.vue';
import SurveyInputField from '../components/SurveyInputField.vue';
import SurveyRadioField from '../components/SurveyRadioField.vue';

/** Import v-money utils */
import { unformat } from '../helpers/utils';

/** Import vee-validate rules */
import { extend } from 'vee-validate';
import { required, email, regex, min } from 'vee-validate/dist/rules';

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
  /** The survey object */
  private survey: Survey = new Survey();
  /** Indicates if the terms are accepted or not */
  private areTermsAccepted = false;
  /** The list of steps */
  private steps: SurveyStep[] = [
    {
      isActive: true,
      isFilled: false,
      isStarted: true,
      icon: 'person',
      title: 'Anagrafica',
      type: SurveyStepType.PersonalData
    },
    {
      isActive: false,
      isFilled: false,
      isStarted: false,
      icon: 'house',
      title: 'Dati immobile',
      type: SurveyStepType.BuildingData
    },
    {
      isActive: false,
      isFilled: false,
      isStarted: false,
      icon: 'check2',
      title: 'Conferma',
      type: SurveyStepType.End
    },
  ];
  /** Indicates the current survey  */
  private currentStep: SurveyStep = this.steps[0];
  /** Indicates the previous step */
  private previousStep: SurveyStep = this.steps[1];

  private get currentStepIndex() {
    return this.steps.indexOf(this.currentStep);
  }

  private get progressLength() {
    // if (this.currentStep === SurveyStepType.End)
    //   return 100;
    // else
    return ((this.currentStepIndex + 1) / this.steps.length) * 100 - 100 / this.steps.length / 2;
  }

  private get enterAnimation() {
    if (this.currentStep.type < this.previousStep.type) {
      return "animated quick fadeInLeft";
    } else {
      return "animated quick fadeInRight";
    }
  }

  private get leaveAnimation() {
    if (this.currentStep.type > this.previousStep.type) {
      return "animated quick fadeOutLeft";
    } else {
      return "animated quick fadeOutRight";
    }
  }

  /**
   * Fires on next button click
   */
  private async onNextButtonClick() {
    this.currentStep.isFilled = true;
    this.currentStep.isActive = false;
    this.previousStep = JSON.parse(JSON.stringify(this.currentStep));

    switch (this.currentStep.type) {
      case SurveyStepType.PersonalData:
      case SurveyStepType.BuildingData:

        this.currentStep = this.steps[this.currentStepIndex + 1];
        this.currentStep.isActive = true;
        this.currentStep.isStarted = true;
        break;
      case SurveyStepType.End:
        this.$emit('survey-complete', this.survey);
    }
  }

  /**
   * Fires on previous button click
   */
  private onGoBackButtonClick() {
    this.previousStep = JSON.parse(JSON.stringify(this.currentStep));
    this.currentStep = this.steps[this.currentStepIndex - 1];
  }

  private goToStep(step: SurveyStep) {
    this.currentStep.isActive = false;
    this.previousStep = JSON.parse(JSON.stringify(this.currentStep));

    this.currentStep = step;
    this.currentStep.isActive = true;
  }

  private show = false;
}
</script>

<style lang="scss" scoped>
@import "../assets/style/main.scss";

.form-control.is-invalid:focus {
  box-shadow: none !important;
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
    transition: all 1s;
  }

  &__box {
    flex: 1;
    flex-grow: 1;
    z-index: 10;
  }

  .icon-disabled {
    color: #dfe1e2 !important;
    pointer-events: none;
    cursor: default;
  }

  .icon-filled {
    border: 3px solid $primary !important;
    color: $primary !important;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: $primary !important;
      color: $white !important;
    }
  }
}
</style>