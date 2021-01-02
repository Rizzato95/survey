<template>
  <div>
    <b-table
      :id="id"
      hover
      :items="provider"
      :per-page="itemsPerPage"
      :current-page="currentPage"
      :selectable="true"
      select-mode="multi"
    >
      <template #cell()="row">
        <span class="text-nowrap"> {{ row.value }} </span>
      </template>
    </b-table>

    <b-pagination
      pills
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="itemsPerPage"
      :aria-controls="id"
      first-number
      last-number
      align="right"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { Filter } from '@/models/Filter';
import { CrudBaseService } from '@/services/CrudBaseService';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Grid extends Vue {
  /** The entity name */
  @Prop({ required: true }) public id!: string;
  /** The entity name */
  @Prop({ required: true }) public entityName!: string;
  /** The filter */
  @Prop({ default: () => new Filter() }) public filter!: Filter;
  /** The filter */
  @Prop() public pageLength!: Filter;
  /** The items per page */
  @Prop({ default: 10 }) public itemsPerPage!: number;


  private service!: CrudBaseService;

  private currentPage = 1;

  private totalItems = 0;

  private get skip() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  private items: any[] = [];

  private created() {
    this.service = new CrudBaseService(this.entityName);
  }

  private async getItems() {
    const response = await this.service.queryFromFilter<any>(this.filter, this.skip, this.itemsPerPage);

    this.totalItems = response.total;

    return response.results;
  }

  private async provider(ctx: any, callback: any) {
    console.log(ctx);
    this.currentPage = ctx.currentPage;
    // Perform any items processing needed

    // Must return an array
    return await this.getItems();
  }
}
</script>
<style lang="scss">
@import "../assets/style/main.scss";
</style>