<template>
  <div>
    <h2 class="text-2xl mb-5">
      Order page
    </h2>
    <div v-if="isLoading">
      <loading-spinner />
    </div>
    <div v-else-if="orders.length">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white mb-5 rounded">
        <div class="flex items-center justify-between p-3 border-b-2">
          <p>Order # {{ order.id }}</p>
          <p>{{ order.status.title }}</p>
        </div>
        <div>
          <div
            v-for="orderToy in order.toy_orders"
            :key="orderToy.id"
            class="flex mb-3 border-b-2 p-2">
            <div class="h-24 mr-2 w-24">
              <img
                class="h-full"
                :src="orderToy.image"
                :alt="orderToy.title">
            </div>
            <div class="flex-grow text-left">
              <p>{{ orderToy.title }}</p>
              <p>item id: {{ orderToy.id }}</p>
              <div class="flex items-center">
                <p class="flex-grow">
                  {{ orderToy.price }} UAH
                </p>
                <span>{{ orderToy.number }}</span>
              </div>
            </div>
          </div>
          <div class="p-2 flex items-center justify-between">
            <p>
              Delivery info: 
              {{ order.delivery.city.title }}, {{ order.delivery.postal_service.title }}, {{ order.delivery.postal_service.postal.title }}
            </p>
            <p class="text-xl lining-nums">
              Total: {{ getOrderTotalSum(order.toy_orders) }} UAH
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-xl italic">
        You don`t have any orders yes. But you can fix this mistake see our goods
        <router-link
          to="/catalog"
          class="underline">
          here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getMyOrders } from '@/api/order'

import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

export default {
    components: {
        LoadingSpinner
    },
    data() {
        return {
            orders: [],
            isLoading: false
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.isLoading = true;
            this.getMyOrders()
                .then(() => {
                    this.isLoading = false;
                });
        },
        getMyOrders() {
            return getMyOrders()
                .then(({list}) => {
                    this.orders = list;
                });
        },
        getOrderTotalSum(toys) {
            return toys.reduce((total, toy) => total += toy.pivot.quantity * toy.pivot.price, 0);
        }
    },
}
</script>
