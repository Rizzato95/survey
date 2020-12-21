<template>
  <validation-provider :name="label" :rules="rules" v-slot="validationContext">
    <b-card class="mt-4">
      <b-form-group
        :id="'group-' + id"
        :label="label"
        :label-for="'input-' + id"
        :state="getValidationState(validationContext)"
      >
        <b-form-select
          :id="'input-' + id"
          :name="'input-' + id"
          v-model="internalValue"
          :state="getValidationState(validationContext)"
          :options="options"
          :aria-describedby="'input-live-feedback' + id"
          @input="onChange"
        ></b-form-select>
        <validation-provider
          v-if="internalValue == otherOptionValue"
          :name="'other-' + label"
          :rules="rules"
          v-slot="validationContext"
        >
          <b-form-input
            class="mt-3"
            :id="'input-other-' + id"
            placeholder="Specificare un valore"
            v-model="otherValue"
            :state="getValidationState(validationContext)"
          />
        </validation-provider>
        <b-form-invalid-feedback :id="'input-live-feedback' + id">{{
          validationContext.errors[0]
        }}</b-form-invalid-feedback>
      </b-form-group>
    </b-card>
  </validation-provider>
</template>

<script lang="ts">
/** Import vue property decorator */
import { Component, Prop } from 'vue-property-decorator';

/** Import base class */
import SurveyBaseField from './SurveyBaseField.vue';

@Component
export default class SurveyDropDownField extends SurveyBaseField {
  @Prop({ default: 'other' }) public otherOptionValue!: string;

  private otherValue = null;

  private options: object = [
    { value: undefined, text: 'Please select an option' },
    { value: 'a', text: 'This is First option' },
    { value: 'b', text: 'This is Second option' },
    { value: 'c', text: 'Altro' }
  ]

  /**
   * Validation state method
   */
  // @ts-ignore
  protected getValidationState({ dirty, validated, valid = null }): boolean | null {
    if ((dirty || validated)) {
      if (this.otherOptionValue == this.internalValue && !this.otherValue)
        return false;
      else
        return valid;
    }
    else
      return null;
  }
}
</script>
