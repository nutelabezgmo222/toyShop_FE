<template>
  <div>
    <loading-spinner v-if="isLoading" />
    <div
      v-else
      class="flex">
      <div class="basis-1/4 bg-red-100 mr-3" />
      <div class="basis-3/4">
        <catalog-wrapper>
          <div
            v-if="toys && toys.length"
            class="grid auto-rows-auto gap-4 grid-cols-4">
            <item-card
              v-for="toy in toys"
              :key="toy.id"
              :title="toy.title"
              :price="toy.price"
              :description="toy.description"
              :image="toy.image"
              :rating="2" />
          </div>
          <div v-else>
            <h2>Sorry nothing to show</h2>
          </div>
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
    props: {
        subCategoryId: {
            type: [String, Number],
            required: false,
            default: null
        },
    },
    data() {
        return {
            isLoading: true,
            toys: [],
        };
    },
    watch: {
        subCategoryId() {
            this.loadData();
        },
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
            let filterObj = null;

            if(this.subCategoryId) {
                filterObj = {
                    subCategoryId: this.subCategoryId
                };
            }

            return getToys(filterObj)
                .then((response) => {
                    this.toys = response.list;
                });
        },
    },
}
</script>