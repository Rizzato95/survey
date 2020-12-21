<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SurveyBaseField extends Vue {
  /** The id */
  @Prop({ required: true }) private id!: string;
  /** The label */
  @Prop({ required: true }) private label!: string;
  /** The validation context */
  @Prop({ required: true }) private value!: string | number | Date;
  /** The rules separeted by pipe (|) or the rules object */
  @Prop() private rules!: any;

  /** The internal value for manage v-model correctly */
  protected internalValue: string | number | Date | null = this.value ?? '';

  /**
   * Validation state method
   */
  protected getValidationState({ dirty, validated, valid = null }): boolean | null {
    return dirty || validated ? valid : null;
  }

  /**
   * Subscribe to onChange event for refresh the contextg
   */
  protected onChange(event: any) {
    this.$emit('input', event);
  }
}
</script>
