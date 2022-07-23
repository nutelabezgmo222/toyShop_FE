<template>
  <div>
    <div v-if="isLoading">
      <loading-spinner />
    </div>
    <div v-else-if="orders.length">
      <table class="border-collapse border border-slate-500 orders-table w-full">
        <col>
        <col>
        <colgroup span="3"></colgroup>
        <thead>
          <tr>
            <th scope="col">User, id</th>
            <th scope="col">Items</th>
            <th scope="col">Total number</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total for row</th>
            <th scope="col">Total</th>
            <th scope="col">Delivery</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody 
          v-for="order in orders"
          :key="order.id"
          class="border-2  border-slate-500">
          <tr>
            <th 
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              <p>{{ order.user.name }}, {{ order.user.surname }}</p>
              <p>{{ order.user.phone_number }}</p>
              <p># {{ order.id}}</p>
            </th>
            <th scope="row">{{ order.toy_orders[0].title }}, #{{ order.toy_orders[0].id }}</th>
            <td>{{ order.toy_orders[0].number }}</td>
            <td>{{ order.toy_orders[0].pivot.quantity }}</td>
            <td>{{ order.toy_orders[0].pivot.price}} UAH</td>
            <td>{{ order.toy_orders[0].pivot.price * order.toy_orders[0].pivot.quantity }} UAH</td>
            <td 
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              {{ getOrderTotalSum(order.toy_orders) }}
            </td>
            <td 
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              <p>{{ order.delivery.postal_service.title}}</p>
              <p>{{ order.delivery.postal_service.postal.title}}, {{ order.delivery.city.title }}</p>
            </td>
            <td 
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              {{ order.status.title }}
            </td>
            <td
              v-if="order.status.id === 1"
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              <Button
                type="save"
                :button-text="orderActions[2]"
                @click="approveOrder(order)" />
            </td>
            <td
              v-else-if="order.status.id === 2"
              :rowspan="order.toy_orders.length"
              scope="rowgroup">
              <Button
                type="remove"
                :button-text="orderActions[3]"
                @click="approveOrder(order)" />
            </td>
          </tr>
          <tr 
            v-for="toy in order.toy_orders.slice(1)"
            :key="toy.id">
            <th scope="row">{{ toy.title }}, #{{ toy.id }}</th>
            <td>{{ toy.number }}</td>
            <td>{{ toy.pivot.quantity }}</td>
            <td>{{ toy.pivot.price}} UAH</td>
            <td>{{ toy.pivot.price * toy.pivot.quantity }} UAH</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-xl italic">
        Orders list is empty
      </p>
    </div>
  </div>
</template>

<script>
import { getAllOrders, changeOrderStatus } from '@/api/admin'

import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import Button from '@/components/Atoms/Button';

export default {
    components: {
        LoadingSpinner,
        Button
    },
    data() {
        return {
            orders: [],
            isLoading: false,
            orderActions: {
                1: 'Put in waiting',
                2: 'Approve',
                3: 'Close'
            },
            orderStatuses: [
                { id: 1, title: 'Waiting for approving' },
                { id: 2, title: 'Approved' },
                { id: 3, title: 'Closed' },
            ],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.isLoading = true;
            this.getAllOrders()
                .then(() => {
                    this.isLoading = false;
                });
        },
        getAllOrders() {
            return getAllOrders()
                .then(({list}) => {
                    this.orders = list;
                });
        },
        getOrderTotalSum(toys) {
            return toys.reduce((total, toy) => total += toy.pivot.quantity * toy.pivot.price, 0);
        },
        approveOrder(order) {
            return changeOrderStatus({ id: order.id, status_id: 2 })
                .then(() => {
                    let orderIdx = this.orders.findIndex(o => o.id === order.id);

                    if(orderIdx !== -1) {
                        this.orders[orderIdx] = { ...order, status: this.orderStatuses[1] };
                    }
                });
        },
    },
}
</script>

<style>
.orders-table td, .orders-table th{
    padding: 5px;
    border: 1px solid slategray;
}
</style>