<template>
  <div>
    <div class="flex w-full border border-indigo-500 border-2 rounded p-2">
      <div class="h-72 w-1/2 flex justify-center">
        <img
          class="h-full"
          :src="item.image"
          :alt="item.title">
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex-grow">
          <p class="mb-3 text-left text-3xl font-bold">
            {{ item.title }}
          </p>
          <p class="mb-3 text-left text-lg">
            {{ item.description }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="uppercase mr-2">
            {{ item.price }} UAH
          </p>
          <div class="text-lg flex justify-center items-center">
            <span 
              class="p-2 rounded-full border border-2 border-indigo-500 text-xl cursor-pointer mr-5"
              @click="removeOne">
              -
            </span>
            <span>{{ item.number }}</span>
            <span
              class="p-2 rounded-full border border-2 border-indigo-500 text-xl cursor-pointer ml-5"
              @click="addOneMore">
              +
            </span>
          </div>
          <div>
            <Button
              type="remove"
              button-text="Remove"
              @click="removeFromBasket" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2">
      Total: {{ totalCost }} UAH
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Button from '@/components/Atoms/Button';

export default {
    components: {
        Button
    },
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    computed: {
        totalCost() {
            return (this.item.price * this.item.number).toFixed(2);
        }
    },
    methods: {
        ...mapActions(['updateItemNumber', 'removeItem']),
        addOneMore() {
            this.updateItemNumber({
                itemId: this.item.id,
                number: this.item.number + 1
            });
        },
        removeOne() {
            if(this.item.number > 1) {
                this.updateItemNumber({
                    itemId: this.item.id,
                    number: this.item.number - 1
                });
            }
        },
        removeFromBasket() {
            this.removeItem(this.item.id);
        },
    },
};
</script>
