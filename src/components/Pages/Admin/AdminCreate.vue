<template>
  <div>
    <div
      v-if="isLoading"
      class="loader">
      Loading....
    </div>
    <div
      v-else
      class="content">
      <div>
        <label>
          <p>Title: </p>
          <input 
            v-model="newToy.title"
            type="text">
        </label>
      </div>
      <div>
        <label>
          <p>Description: </p>
          <input
            v-model="newToy.description"
            type="text">
        </label>
      </div>
      <div>
        <label>
          <p>Price: </p>
          <input 
            v-model="newToy.price"
            type="text">
        </label>
      </div>

      <selector 
        title="Gender"
        :options="genders"
        @updated="newToy.gender_id = $event" />
  
      <selector 
        title="Age limit"
        :options="enchancedLimits"
        @updated="newToy.age_limit_id = $event" />

      <selector 
        title="Brand"
        :options="enchancedBrands"
        @updated="newToy.brand_id = $event" />

      <div>
        <button @click="onToyCreate">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgeLimits } from '@/api/subInformation';
import { getBrands } from '@/api/brand';
import { createToy } from '@/api/toys';

import Selector from '@/components/Atoms/Select';

export default {
    components: {
        Selector
    },
    data() {
        return {
            isLoading: false,
            ageLimits: [],
            brands: [],
            genders: [
                 {id: 1, title: 'boy'},
                 {id: 2, title: 'girl'},
                 {id: 3, title: 'unisex'},
            ],
            newToy: {
                gender_id: null,
                brand_id: null,
                age_limit_id: null,

                title: '',
                description: '',
                price: 0
            }
        };
    },
    computed: {
        enchancedBrands() {
            return this.brands.map(brand => {
                brand.title = 'BRAND: ' + brand.title;

                return brand;
            });
        },
        enchancedLimits() {
            return this.ageLimits.map(limit => {
                limit.title = `${limit.lower_age_limit} - ${limit.upper_age_limit}`;

                return limit;
            });
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.isLoading = true;

            let promises = [
                this.getAgeLimits(),
                this.getBrands()
            ];

            return Promise.all(promises).then(() => {
                this.isLoading = false;
            });
        },
        getAgeLimits() {
            return getAgeLimits().then(data => {
                this.ageLimits = data.list;
            });
        },
        getBrands() {
            return getBrands().then(data => {
                this.brands = data.list;
            });
        },
        onToyCreate() {
            if(!this.validateToy) return;

            return createToy(this.newToy).then((response) => {
                console.log(response);
            });
        },
        validateToy() {
            return this.newToy.title &&
                this.newToy.price &&
                this.newToy.selectedGender &&
                this.newToy.selectedBrand &&
                this.newToy.selectedAgeLimit;
        }
    }
};

</script>

<style>

</style>