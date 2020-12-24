<template>
  <validation-provider :name="label" :rules="rules" v-slot="validationContext">
    <b-form-group
      :id="'group-' + id"
      :label="label"
      :label-for="'input-' + id"
      :state="getValidationState(validationContext)"
      :class="{ required: isRequired }"
    >
      <b-form-radio-group
        :id="'radio-group-' + id"
        :name="'radio-group-' + id"
        v-model="internalValue"
        :options="options"
        :state="getValidationState(validationContext)"
        stacked
      >
        <b-form-invalid-feedback
          :id="'input-live-feedback' + id"
          :state="getValidationState(validationContext)"
          >{{ validationContext.errors[0] }}</b-form-invalid-feedback
        >
      </b-form-radio-group>
      <b-form-invalid-feedback :id="'input-live-feedback' + id">{{
        validationContext.errors[0]
      }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script lang="ts">
/** Import vue property decorator */
import { Component, Prop, Vue } from 'vue-property-decorator';

/** Import base class */
import SurveyBaseField from './SurveyBaseField.vue';

@Component
export default class SurveyRadioField extends SurveyBaseField {
  private options: any = [
    { text: 'Si', value: true },
    { text: 'No', value: false }
  ]

  private created() {
    this.internalValue = null;
  }
}
</script>
