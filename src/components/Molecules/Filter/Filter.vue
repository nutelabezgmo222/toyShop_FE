<template>
  <div class="p-4">
    <h2 class="text-left mb-3 text-xl">
      Filters
    </h2>
    <loading-spinner v-if="isLoading" />
    <div v-else>
      <div
        v-for="filter in filters"
        :key="filter.id">
        <closeable
          :title="filter.title">
          <template #default>
            <multi-choice
              v-if="filter.type === FieldTypes.MULTI_CHOICE"
              :options="filter.items"
              @update="onCheckboxChange(filter.objectProperty, $event)" />
          </template>
        </closeable>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgeLimits, getGenders } from '@/api/subInformation';
import { getBrands } from '@/api/brand';

import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import MultiChoice from '@/components/Atoms/MultiChoice';
import Closeable from '@/components/Atoms/Closeable';

const FieldTypes = {
    MULTI_CHOICE: 'multi_choice'
};

export default {
    components: {
        LoadingSpinner,
        MultiChoice,
        Closeable
    },
    props: {
        subCategoryId: {
            type: [String, Number],
            required: false,
            default: null
        },
    },
    emits: ['filterChange'],
    data() {
        return {
            isLoading: false,
            ageLimits: [],
            brands: [],
            genders: [],
            appliedFilters: {},
            FieldTypes
        };
    },
    computed: {
        filters() {
            let filters = [];

            if(this.brands && this.brands.length) {
                filters.push({
                    id: 1,
                    title: 'Brands',
                    objectProperty: 'brand',
                    type: this.FieldTypes.MULTI_CHOICE,
                    items: this.brands.map(brand => ({
                          value: brand.id,
                          title: brand.title
                    }))
                });
            }

            if(this.ageLimits && this.ageLimits.length) {
                filters.push({
                    id: 2,
                    title: 'Age limits',
                    objectProperty: 'age_limit',
                    type: this.FieldTypes.MULTI_CHOICE,
                    items: this.ageLimits.map(ageLimit => ({
                          value: ageLimit.id,
                          title: `from ${ageLimit.lower_age_limit} to ${ageLimit.upper_age_limit}`
                    }))
                });
            }

            if(this.genders && this.genders.length) {
                filters.push({
                    id: 3,
                    title: 'Genders',
                    objectProperty: 'gender_category',
                    type: this.FieldTypes.MULTI_CHOICE,
                    items: this.genders.map(gender => ({
                          value: gender.id,
                          title: gender.title
                    }))
                });
            }

            return filters;
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.isLoading = true;

            let promises = [
                this.getAgeLimits(this.subCategoryId),
                this.getBrands(this.subCategoryId),
                this.getGenders(this.subCategoryId)
            ];

            return Promise.all(promises).then(() => {
                this.isLoading = false;
            });
        },
        getAgeLimits(subCategoryId) {
            return getAgeLimits(subCategoryId).then(data => {
                this.ageLimits = data.list;
            });
        },
        getBrands(subCategoryId) {
            return getBrands(subCategoryId).then(data => {
                this.brands = data.list;
            });
        },
        getGenders(subCategoryId) {
            return getGenders(subCategoryId).then(data => {
                this.genders = data.list;
            });
        },
        onCheckboxChange(objProp, filterItem) {
            if(!this.appliedFilters[objProp]) {
                this.appliedFilters[objProp] = [];
            }

            let itemIdx = this.appliedFilters[objProp].findIndex(filter => filter.value === filterItem.value);

            if(itemIdx === -1) {
                this.appliedFilters[objProp].push(filterItem);
            } else {
                this.appliedFilters[objProp][itemIdx] = filterItem;
            }

            this.emitFilterChange();
        },
        emitFilterChange() {
            this.$emit('filterChange', this.appliedFilters);
        },
    },
}
</script>