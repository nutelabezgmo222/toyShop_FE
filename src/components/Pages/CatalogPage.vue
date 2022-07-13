<template>
  <div>
    <loading-spinner v-if="isLoading" />
    <div
      v-else
      class="flex">
      <div class="basis-1/4 bg-red-100 mr-3">
        <Filter 
          :sub-category-id="subCategoryId"
          @filter-change="appliedFilters = $event" />
      </div>
      <div class="basis-3/4">
        <catalog-wrapper>
          <div
            v-if="filteredToys && filteredToys.length"
            class="grid auto-rows-auto gap-4 grid-cols-4">
            <item-card
              v-for="toy in filteredToys"
              :key="toy.id"
              :title="toy.title"
              :price="toy.price"
              :description="toy.description"
              :image="toy.image"
              :rating="toy.rating" />
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
import ItemCard from '@/components/Atoms/ItemCard';
import Filter from '@/components/Molecules/Filter/Filter';

export default {
    components: {
        LoadingSpinner,
        CatalogWrapper,
        ItemCard,
        Filter
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
            appliedFilters: {},
            toys: [],
        };
    },
    computed: {
        filteredToys() {
            let toys = this.toys.slice(0);
            let filterKeys = Object.keys(this.appliedFilters);

            if(filterKeys && filterKeys.length) {
                filterKeys.forEach(key => {
                    let filterValues = this.appliedFilters[key].filter(item => item.isChecked).map(item => item.value);

                    if(filterValues && filterValues.length) {
                        toys = toys.filter(toy => toy[key] && filterValues.includes(toy[key].id));
                    }
                });
            }

            return toys;
        }
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