<template>
  <validation-provider :name="label" :rules="rules" v-slot="validationContext">
    <b-form-group
      :id="'group-' + id"
      :label="label"
      :label-for="'input-' + id"
      :state="getValidationState(validationContext)"
      :class="{ required: isRequired }"
    >
      <b-form-input
        :id="'input-' + id"
        :name="'input-' + id"
        v-model="internalValue"
        v-money="vMoneyRule"
        :type="type"
        :state="getValidationState(validationContext)"
        :aria-describedby="'input-live-feedback' + id"
        @input="onChange"
        v-mask="vMaskRule"
      ></b-form-input>
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

/** Import vue mask directive */
// @ts-ignore
import { VueMaskDirective } from 'v-mask';
Vue.directive('mask', VueMaskDirective);

// @ts-ignore
import { VMoney } from 'v-money';
Vue.directive('money', VMoney);

@Component
export default class SurveyMoneyField extends SurveyBaseField {
  /** The validation context */
  @Prop({ default: 'text' }) private type!: string;
  /** The rules separeted by pipe (|) */
  @Prop({ default: '' }) private vMaskRule!: string;
  /** The rules separeted by pipe (|) */
  @Prop({ default: '' }) private vMoneyRule!: any;
}
</script>
