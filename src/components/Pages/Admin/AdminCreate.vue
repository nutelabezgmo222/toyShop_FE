<template>
  <div class="text-justify">
    <div
      v-if="isLoading"
      class="w-72">
      <loading-spinner />
    </div>
    <div
      v-else
      class="content">
      <input-field
        title="Title"
        type="text"
        :value="newToy.title"
        :error="!newToy.title && status.isSent"
        @input="newToy.title = $event" />

      <input-field
        title="Description"
        type="text"
        :value="newToy.description"
        :error="!newToy.description && status.isSent"
        @input="newToy.description = $event" />

      <input-field
        title="Price"
        type="number"
        :value="newToy.price"
        :error="!newToy.price && status.isSent"
        @input="newToy.price = $event" />

      <select-filed 
        title="Gender"
        :options="genders"
        :error="!newToy.gender_id && status.isSent"
        @updated="newToy.gender_id = $event" />

      <select-filed
        title="Age limit"
        :options="enchancedLimits"
        :error="!newToy.age_limit_id && status.isSent"
        @updated="newToy.age_limit_id = $event" />

      <select-filed 
        title="Brand"
        :options="enchancedBrands"
        :error="!newToy.brand_id && status.isSent"
        @updated="newToy.brand_id = $event" />

      <input-field
        title="Number in the store"
        type="text"
        :value="newToy.number"
        :error="!newToy.number && status.isSent"
        @input="newToy.number = $event" />

      <input-field
        title="Image URL"
        type="text"
        :value="newToy.image"
        :error="!newToy.image && status.isSent"
        @input="newToy.image = $event" />

      <div>
        <Button
          type="save"
          button-text="Save"
          @click="onToyCreate" />
      </div>

      <p
        v-if="status.isSent && !status.isSuccessfully"
        class="p-4 bg-red-400 rounded-md mt-4">
        There are some errors
      </p>
      <p
        v-else-if="status.isSent && status.isSuccessfully"
        class="p-4 bg-lime-400 rounded-md mt-4">
        Toy has been successfully created
      </p>
    </div>
  </div>
</template>

<script>
import { getAgeLimits } from '@/api/subInformation';
import { getBrands } from '@/api/brand';
import { createToy } from '@/api/toys';

import SelectFiled from '@/components/Atoms/SelectFiled';
import InputField from '@/components/Atoms/InputField';
import Button from '@/components/Atoms/Button.vue';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner.vue';

export default {
    components: {
        SelectFiled,
        InputField,
        Button,
        LoadingSpinner
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
                price: 0,
                image: '',
                number: 0
            },
            status: {
                isSent: false,
                isSuccessfully: false
            },
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
            this.status.isSent = true;
            if(!this.validateToy) return;

            return createToy(this.newToy)
                .then(() => {
                    this.status.isSuccessfully = true;
                })
                .catch(() => {
                    this.status.isSuccessfully = false; 
                });
        },
        validateToy() {
            return this.newToy.title &&
                this.newToy.price &&
                this.newToy.selectedGender &&
                this.newToy.selectedBrand &&
                this.newToy.number &&
                this.newToy.selectedAgeLimit;
        }
    }
};
</script>