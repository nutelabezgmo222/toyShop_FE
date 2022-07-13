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
      <div class="mt-10">
        <Button
          type="save"
          button-text="Make order" />
      </div>
    </div>
    <div v-else>
      No items in basket
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BasketItemCard from '@/components/Atoms/BasketItemCard';
import Button from '@/components/Atoms/Button';

export default {
    components: {
        BasketItemCard,
        Button
    },
    computed: {
        ...mapGetters(['itemInBasket'])
    },
    methods: {
        ...mapActions(['clearItems'])
    },
}
</script>
