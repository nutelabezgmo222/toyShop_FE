<template>
  <div>
    <loading-spinner v-if="isLoading" />
    <div
      v-else
      class="flex">
      <div class="basis-1/4 bg-red-100 mr-3" />
      <div class="basis-3/4">
        <catalog-wrapper class="grid auto-rows-auto gap-4 grid-cols-4">
          <item-card
            v-for="toy in toys"
            :key="toy.id"
            :title="toy.title"
            :price="toy.price"
            :description="toy.description"
            :image="toy.image"
            :rating="2" />
        </catalog-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { getToys } from '@/api/toys';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import CatalogWrapper from '@/components/Molecules/Catalog/CatalogWrapper';
import ItemCard from '../Atoms/ItemCard.vue';

export default {
    components: {
        LoadingSpinner,
        CatalogWrapper,
        ItemCard
    },
    data() {
        return {
            isLoading: true,
            toys: [],
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.isLoading = true;

            return this.getToys().then(() => {
                this.isLoading = false;
            });
        },
        getToys() {
            return getToys()
                .then((response) => {
                    this.toys = response.list;
                });
        },
    },
}
</script>