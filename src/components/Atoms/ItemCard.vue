<template>
  <div class="flex flex-col p-5 border rounded bg-white">
    <router-link
      class="block w-full"
      :to="'/item/' + id">
      <img
        class="max-w-full"
        :src="image"
        :alt="title">
    </router-link>
    <div class="flex justify-between mt-2">
      <span>
        rating {{ rating }}
      </span>
      <span>
        {{ comments.length }} comments
      </span>
    </div>
    <div>
      <p class="text-left">
        {{ title }}
      </p>
    </div>
    <div
      class="mt-5 flex justify-between items-center"
      :class="{'flex-col': alreadyInBasket}">
      <span>{{ price }} <span class="text-sm">UAH</span></span>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Button from '@/components/Atoms/Button';

export default {
    components: {
        Button,
    },
    props: {
        id: {
            type: [Number, String],
            required: true,
            default: null
        },
        title: {
            type: String,
            required: true,
            default: ''
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true,
            default: ''
        },
        image: {
            type: String,
            required: true,
            default: ''
        },
        rating: {
            type: Number,
            required: false,
            default: 1,
            validator: (rating) => { return rating >= 0 && rating <= 5}
        },
        comments: {
            type: Array,
            required: false,
            default: () => []
        },
    },
    computed: {
        ...mapGetters(['idsInBasket']),
        alreadyInBasket() {
            return this.idsInBasket.includes(this.id);
        },
    },
    methods: {
        ...mapActions(['addItem']),
        addToBasket() {
            this.addItem(this.getItemInfo());
        },
        getItemInfo() {
            return {
                id: this.id,
                title: this.title,
                price: this.price,
                description: this.description,
                image: this.image,
                number: 1
            };
        },
    },
}
</script>