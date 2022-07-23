<template>
  <div>
    <div v-if="isLoading">
      <loading-spinner />
    </div>
    <div v-else-if="data">
      <div>
        <div class="text-2xl font-bold text-left mb-5">
          <h2>
            {{ data.title }}
          </h2>
        </div>

        <div class="flex">
          <div class="w-1/2 mr-5">
            <img
              class="w-full"
              :src="data.image" 
              :alt="data.title">
          </div>

          <div class="w-1/2 flex flex-col text-left bg-white p-5 border rounded text-lg">
            <h3 class="text-xl mb-3">
              Description
            </h3>
            <p class="text-sm mb-2">
              Rating {{ data.rating }} of 5
            </p>
            <p class="italic">
              Brand: {{ data.brand.title }}, {{ data.brand.country.title }}
            </p>
            <p class="mb-3">{{ data.brand.description }}</p>
            <div class="mb-3">
              <p>Tags:</p>
              <div class="flex">
                <span
                  v-for="subCategory in data.sub_categories"
                  :key="subCategory.id"
                  class="p-2 bg-red-100 text-orange-600 rounded-lg mr-3" >
                  {{ subCategory.title }}
                </span>
              </div>
            </div>
            <div class="mb-3">
              <p class="mb-2">Age limits:</p>
              <div>
                <span class="p-2 bg-green-100 text-lime-600 rounded-lg mr-3">
                  {{ data.age_limit.lower_age_limit }} - {{ data.age_limit.upper_age_limit }} 
                </span>
              </div>
            </div>
            <div class="mb-3">
              <p class="mb-2">Gender category:</p>
              <div>
                <span class="p-2 bg-cyan-100 text-cyan-600 rounded-lg mr-3">
                  {{ data.gender_category.title }}
                </span>
              </div>
            </div>
            <div class="text-sm mb-3">
              {{ data.description }}
            </div>
            <div class="mb-8">
              Price: {{ data.price }} UAH
            </div>

            <div v-if="!alreadyInBasket">
              <Button
                type="save"
                button-text="Buy"
                @click="addToBasket" />
            </div>
            <div 
              v-else
              class="flex items-center">
              <span>In basket</span>
              &check;
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-else
      class="text-3xl font-bold">
      404 Item not founded
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getToyById } from '@/api/toys';

import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import Button from '@/components/Atoms/Button';

export default {
    components: {
        LoadingSpinner,
        Button
    },
    props: {
        itemId: {
            type: [String, Number],
            required: true,
        }
    },
    data() {
        return {
            data: null,
            isLoading: false,
        };
    },
    computed: {
        ...mapGetters(['idsInBasket']),
        alreadyInBasket() {
            return this.idsInBasket.includes(+this.itemId);
        },
    },
    watch: {
        itemid(newId) {
            if(newId) {
                this.getToyById();
            }
        }
    },
    mounted() {
        this.getToyById();
    },
    methods: {
        ...mapActions(['addItem']),
        addToBasket() {
            this.addItem(this.getItemInfo());
        },
        getToyById() {
            if(!this.itemId) return;
            this.isLoading = true;

            return getToyById(this.itemId)
                .then(response => {
                    this.isLoading = false;
                    this.data = response.data;
                });
        },
        getItemInfo() {
            return {
                id: this.data.id,
                title: this.data.title,
                price: this.data.price,
                description: this.data.description,
                image: this.data.image,
                number: 1
            };
        },
    },
}
</script>
