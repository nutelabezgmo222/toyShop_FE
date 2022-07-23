<template>
  <div>
    <div v-if="itemInBasket && itemInBasket.length">
      <div class="mb-10">
        <Button
          type="remove"
          button-text="Clear basket"
          @click="clearItems" />
      </div>
      <div 
        v-for="item in itemInBasket"
        :key="item.id">
        <basket-item-card
          class="mb-5"
          :item="item" />
      </div>
      <div
        v-if="recommendedToys && recommendedToys.length && !isLoading"
        class="mt-10">
        <p class="mb-2">
          Most popular with this items
        </p>
        <slider
          :items="recommendedToys"
          :show-at-once="sliderMaxLength"
          :speed="speenSpeed" />
      </div>
      <div class="mt-10">
        <div v-if="isUserLogged">
          <router-link to="/order">
            <Button
              type="save"
              button-text="Make order" />
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login?from=order">
            <span class="underline italic text-xl">Register or log in to make order</span>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      No items in basket
    </div>
  </div>
</template>

<script>
import { getToys } from '@/api/toys';
import { getRecommendationsForItems } from '@/api/subInformation'
import { mapActions, mapGetters } from 'vuex';

import BasketItemCard from '@/components/Atoms/BasketItemCard';
import Slider from '@/components/Atoms/Slider';
import Button from '@/components/Atoms/Button';

export default {
    components: {
        BasketItemCard,
        Button,
        Slider
    },
    data() {
        return {
            sliderMaxLength: 5,
            speenSpeed: 2,
            recommendations: {},
            allToys: [],
        };
    },
    computed: {
        ...mapGetters(['itemInBasket', 'isUserLogged', 'idsInBasket']),
        sliderItems() {
            return this.itemInBasket;
        },
        recommendedToys() {
            let result = this.allToys.filter(toy => {
                return Object.keys(this.recommendations).includes(toy.id + '') &&
                  !this.idsInBasket.includes(toy.id)
            });

            return result;
        },
    },
    watch: {
        idsInBasket() {
            this.getRecommendationsForItems();
        },
    },
    mounted() {
        this.getAllToys();
        this.getRecommendationsForItems();
    },
    methods: {
        ...mapActions(['clearItems']),
        getRecommendationsForItems() {
            return getRecommendationsForItems(this.idsInBasket)
                .then(({list}) => {
                    this.recommendations = list;
                });
        },
        getAllToys() {
            return getToys()
                .then(({list}) => {
                    this.allToys = list;
                });
        },
    },
}
</script>
