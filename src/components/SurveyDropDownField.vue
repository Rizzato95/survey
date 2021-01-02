<template>
  <validation-provider :name="label" :rules="rules" v-slot="validationContext">
    <b-form-group
      :id="'group-' + id"
      :label="label"
      :label-for="'input-' + id"
      :state="getValidationState(validationContext)"
      :class="{ required: isRequired }"
    >
      <b-form-select
        :id="'input-' + id"
        :name="'input-' + id"
        v-model="internalValue"
        :state="getValidationState(validationContext)"
        :options="options"
        :value-field="valueField"
        :text-field="textField"
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
          :value="otherValue"
          @input="onOtherValueChange"
          :state="getValidationState(validationContext)"
        />
      </validation-provider>
      <b-form-invalid-feedback :id="'input-live-feedback' + id">{{
        validationContext.errors[0]
      }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script lang="ts">
/** Import vue property decorator */
import { Component, Prop } from 'vue-property-decorator';

/** Import services */
import { CrudBaseService } from '@/services/CrudBaseService';
import { EnumService } from '@/services/EnumService';
import { ResourcesService } from '@/services/ResourcesService';

/** Import base class */
import SurveyBaseField from './SurveyBaseField.vue';

@Component
export default class SurveyDropDownField extends SurveyBaseField {
  /** The text field */
  @Prop({ default: 'translation' }) public textField!: string;
  /** The value field */
  @Prop({ default: 'value' }) public valueField!: string;
  /** The entity name */
  @Prop({ required: true }) public entityName!: string;
  /** The entity name */
  @Prop({ default: 'Enum' }) public entityType!: 'Enum' | 'Entity';
  /** The value of the option for show the "other" textbox */
  @Prop({ default: 'other' }) public otherOptionValue!: string | number;
  /** The value of the option for show the "other" textbox */
  @Prop() public otherValue!: string | number;

  /** The options of the select */
  private options: any[] = [];

  /**
   * Vue lifecycle event
   */
  private async created() {
    // If a value is not provided, set internalValue to null for show the 'SelectOption'.
    if (this.internalValue == '')
      this.internalValue = null;

    if (this.entityType == 'Enum') {
      const enumService = new EnumService();
      this.options = await enumService.get(this.entityName);
    }
    else {
      const crudBaseServide = new CrudBaseService(this.entityName);
      this.options = await crudBaseServide.get();
    }

    // Add the select option
    const resourceService = new ResourcesService();
    this.options.unshift(
      {
        [this.textField]: await (await resourceService.getResource('SelectOption')).stringValue,
        [this.valueField]: null
      });
  }

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

  /**
   * Fires on otherValue input change for update the sync property of the parent
   */
  private onOtherValueChange(value: any) {
    this.$emit('update:otherValue', value);
  }
}
</script>
