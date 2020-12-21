<template>
  <div class="text-center">
    <b-container class="survey__logos">
      <b-row cols="2">
        <b-col>
          <b-img src="../assets/logo-revaluta.png" class="logo-img" />
        </b-col>
        <b-col>
          <b-img src="../assets/logo-unicredit.png" class="logo-img" />
        </b-col>
      </b-row>
    </b-container>
    <!-- Intro -->
    <div v-if="currentStep == 0">
      <b-container class="survey__intro">
        <b-row>
          <b-col>
            <h1 class="survery__intro-title">Green110 - Superbonus Revaluta</h1>
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
              Per poter proseguire confermare la presa visione dell'informativa
              sul trattamento dei dati.
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
                @click="onStartSubmit"
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
    <!-- Personal data -->
    <div v-if="currentStep == 1">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onPersonalDataSubmit)">
          <b-container class="text-left mt-4">
            <!-- Name -->
            <survey-input-field
              id="name"
              label="Nome"
              rules="required"
              type="text"
              v-model="localSurvey.name"
            />
            <!-- Surname -->
            <survey-input-field
              id="surname"
              label="Cognome"
              rules="required"
              type="text"
              v-model="localSurvey.surname"
            />
            <!-- Fiscal code -->
            <survey-input-field
              id="fiscal-code"
              label="Codice fiscale"
              type="text"
              v-model="localSurvey.fiscalCode"
              :rules="{
                required: true,
                regex: /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/,
              }"
              vMaskRule="XXXXXXXXXXXXXXXX"
            />
            <!-- Email -->
            <survey-input-field
              id="email"
              label="Email"
              rules="required|email"
              type="email"
              v-model="localSurvey.email"
            />
            <!-- Phone -->
            <survey-input-field
              id="phone"
              label="Telefono"
              rules="required"
              type="tel"
              v-model="localSurvey.phone"
              vMaskRule="############"
            />
            <survey-drop-down-field
              id="role"
              label="Qualifica"
              rules="required"
              otherOptionValue="c"
              v-model="localSurvey.role"
            />
            <survey-radio-field
              id="role"
              label="Test"
              rules="required"
              v-model="localSurvey.test"
            />
          </b-container>
          <b-container class="mt-4 text-right">
            <div class="row">
              <div class="col">
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
              </div>
            </div>
          </b-container>
        </b-form>
      </validation-observer>
    </div>
    <!-- Building data -->
    <div v-if="currentStep == 2">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onBuildingDataSubmit)">
          <b-container class="text-left mt-4">
            <!-- Recipient -->
            <survey-drop-down-field
              id="recipient"
              label="Il beneficiario del SUPERBONUS sarà"
              rules="required"
              v-model="localSurvey.recipient"
            />
            <!-- Building type -->
            <survey-drop-down-field
              id="buildingType"
              label="Indichi la tipologia di edificio che sarà oggetto dell'intervento"
              rules="required"
              v-model="localSurvey.interventionType"
            />
            <!-- Intervention type -->
            <survey-drop-down-field
              id="interventionType"
              label="Indichi la tipologia di intervento"
              rules="required"
              v-model="localSurvey.buildingType"
            />
            <!-- Energy Performance Certificate -->
            <survey-radio-field
              id="energyCertificate"
              label="Si dispone già dell'Attestato di Prestazione Energetica (APE) dell'immobile?"
              rules="required"
              v-model="localSurvey.hasEnergyPerformanceCertificate"
            />
            <!-- Building energetic class -->
            <survey-drop-down-field
              id="builiding-energetic-class"
              label="Qual è la classe energetica dell'immobile?"
              rules="required"
              v-model="localSurvey.buildingEnergeticClass"
            />
            <!-- Energetic riqualification projecft -->
            <survey-radio-field
              id="energetic-riqualification-project"
              label="E' già stato prodotto il progetto di riqualificazione energetica?"
              rules="required"
              v-model="localSurvey.hasEnergeticRiqualification"
            />
            <!-- Suppliers quotes -->
            <survey-radio-field
              id="suppliers-quotes"
              label="Sono già stati raccolti i preventivi dai fornitori?"
              rules="required"
              v-model="localSurvey.hasSuppliersQuotes"
            />
            <!-- Intervention cost -->
            <survey-input-field
              id="intervention-cost"
              label="Fornire una stima del costo dell'intervento."
              rules="money-more-than:4"
              type="text"
              v-model="localSurvey.interventionCost"
              :vMoneyRule="{
                decimal: ',',
                thousands: '.',
                prefix: '€ ',
                precision: 0,
                masked: false,
              }"
              vMaskRule="##########"
            />
            <!-- Works are already started -->
            <survey-radio-field
              id="works-already-started"
              label="Ha già avviato i lavori di riqualificazione energetica?"
              rules="required"
              v-model="localSurvey.hasStartEnergeticRiqualification"
            />
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

/** Import models */
import { Survey } from '../models/Survey';
import { SurveyStepType } from '../models/SurveyStepType';

/** Import components */
import SurveyDropDownField from '../components/SurveyDropDownField.vue';
import SurveyInputField from '../components/SurveyInputField.vue';
import SurveyRadioField from '../components/SurveyRadioField.vue';

/** Import v-money utils */
import { unformat } from '../helpers/utils';

/** Import vee-validate rules */
import { extend } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';

extend('required', required);
extend('email', email);
extend('regex', regex);

/** Custom rule for money */
const moneyValidator = {
  getMessage: (field: any) => 'The ' + field + ' value is not truthy.',

  validate(value: any, args: any) {
    const v: any = unformat(value, 0);
    return v > (args ?? 0);
  }
};
extend('money-more-than', moneyValidator);

@Component({
  components: {
    SurveyDropDownField,
    SurveyInputField,
    SurveyRadioField
  }
})
export default class SurveyView extends Vue {
  /** The survey object*/
  private localSurvey: Survey = new Survey();
  /** Indicates if the terms are accepted or not */
  private areTermsAccepted = false;
  /** Indicates the current survey  */
  private currentStep: SurveyStepType = SurveyStepType.PersonalData;

  private onStartSubmit() {
    this.onSubmit(SurveyStepType.Start);
  }

  private onPersonalDataSubmit() {
    this.onSubmit(SurveyStepType.PersonalData);
  }

  private onBuildingDataSubmit() {
    this.onSubmit(SurveyStepType.BuildingData);
  }

  private async onSubmit(step: SurveyStepType) {
    switch (step) {
      case SurveyStepType.Start:
        this.currentStep = SurveyStepType.PersonalData;
        break;
      case SurveyStepType.PersonalData:
        this.currentStep = SurveyStepType.BuildingData
        break;
      case SurveyStepType.BuildingData:
        if (await this.saveData())
          this.currentStep = SurveyStepType.End;
        break;
    }
  }

  private onGoBackButtonClick(step: SurveyStepType) {
    this.currentStep -= 1;
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
  height: 80px;
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
    height: 40px;
  }
}
</style>