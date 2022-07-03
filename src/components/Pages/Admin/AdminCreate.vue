<template>
  <div class="text-justify">
    <div
      v-if="isLoading"
      class="loader">
      Loading....
    </div>
    <div
      v-else
      class="content">

        <input-field
          title="Title"
          type="text"
          :value="newToy.title"
          @input="newToy.title = $event" />

        <input-field
          title="Description"
          type="text"
          :value="newToy.description"
          @input="newToy.description = $event" />

        <input-field
          title="Price"
          type="number"
          :value="newToy.price"
          @input="newToy.price = $event" />

        <selector 
          title="Gender"
          :options="genders"
          @updated="newToy.gender_id = $event" />

        <selector 
          title="Age limit"
          :options="enchancedLimits"
          @updated="newToy.age_limit_id = $event" />

        <selector 
          error="true"
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
import InputField from '@/components/Atoms/Input';

export default {
    components: {
        Selector,
        InputField
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
        // this.loadData();
        this.ageLimits = [
            {
                id: 1,
                lower_age_limit: 0,
                upper_age_limit: 4
            },
            {
                id: 2,
                lower_age_limit: 5,
                upper_age_limit: 8
            },
            {
                id: 3,
                lower_age_limit: 9,
                upper_age_limit: 12
            },
            {
                id: 4,
                lower_age_limit: 13,
                upper_age_limit: 18
            }
        ];
        this.brands = [
            {
                id: 1,
                title: "Brand 1"
            },
            {
                id: 2,
                title: "Brand 2"
            },
            {
                id: 3,
                title: "Brand 3"
            },
            {
                id: 4,
                title: "Brand 4"
            },
            {
                id: 5,
                title: "Brand 1"
            }
        ];
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