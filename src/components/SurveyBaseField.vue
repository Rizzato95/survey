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
  /** The label */
  @Prop({ default: true }) private isRequired!: boolean;

  /** The rules separeted by pipe (|) or the rules object */
  @Prop() private rules!: object | string;

  /** The internal value for manage v-model correctly */
  protected internalValue: string | boolean | number | Date | null = this.value ?? '';

  /**
   * Validation state method
   */
  // @ts-ignore
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
<style lang="scss">
@import "../assets/style/main.scss";
.required > label::after {
  content: "  *" !important;
  color: $primary !important;
}
</style>