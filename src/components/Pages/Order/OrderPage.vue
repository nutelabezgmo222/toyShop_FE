<template>
  <div>
    <div>
      <h2 class="font-bold mb-5 text-xl">
        Your order
      </h2>
      <div
        v-if="!orderFinished && itemInBasket && itemInBasket.length"
        class="flex items-start">
        <div class="w-2/3 bg-white p-5 border text-left mr-5">
          <h2 class="font-bold mb-5 text-xl">
            Order details
          </h2>
          <div v-if="!isLoading && isUserLogged">
            <h3 class="mb-3">
              Contact info
            </h3>
            <div>
              <form-builder
                class="grid grid-cols-2"
                :fields="orderFields"
                @property-changed="onPropertyChanged" />
            </div>
            <div>
              <Button
                :type="isAllFieldsHasValue ? 'save' : 'util'"
                button-text="Make order"
                @click="onOrderButtonClick" />
            </div>
          </div>
          <div v-else-if="isLoading">
            <loading-spinner />
          </div>
          <div v-else>
            Sorry but you need to log in first
          </div>
        </div>
        <div class="flex flex-col bg-white border p-2 w-1/3">
          <div
            v-for="item in itemInBasket"
            :key="item.id"
            class="flex mb-3 border-b-2 p-2">
            <div class="h-24 mr-2 w-24">
              <img
                class="h-full"
                :src="item.image"
                :alt="item.title">
            </div>
            <div class="flex-grow text-left">
              <p>{{ item.title }}</p>
              <p>item id: {{ item.id }}</p>
              <div class="flex items-center">
                <p class="flex-grow">
                  {{ item.price }} UAH
                </p>
                <span 
                  class="mr-5"
                  :class="circleClassList"
                  @click="removeOne(item.id, item.number)">
                  -
                </span>
                <span>{{ item.number }}</span>
                <span
                  class="ml-5"
                  :class="circleClassList"
                  @click="addOneMore(item.id, item.number)">
                  +
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <p>Total:</p>
            <p class="text-xl font-bold lining-nums">
              {{ orderTotal }} UAH
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="orderFinished">
        <div class="flex justify-center mb-5">
          <h2 class="text-5xl font-bold self-end mr-5">
            Thank you for your purchase
          </h2>
          <img
            :src="CheckMark"
            class="h-32"
            alt="check-mark">
        </div>
        <p>
          You can find more information in your
          <router-link 
            to="/profile/orders"
            class="underline">
            personal area
          </router-link>
        </p>
      </div>
      <div v-else>
        <p>Sorry but you need add something to basket first</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { createOrder, getPostals } from '@/api/order';
import { getCountries } from '@/api/subInformation';
import FormBuilder from '@/components/Molecules/FormBuilder';
import Button from '@/components/Atoms/Button';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import CheckMark from '@/assets/images/checkmark.png';

import { FieldTypes } from '@/utils/FieldTypes';

export default {
    components: {
        FormBuilder,
        Button,
        LoadingSpinner
    },
    data() {
        return {
            orderFieldValues: {
                name: '',
                surname: '',
                email: '',
                phone_number: '',
                country: '',
                city: '',
                postal_service: '',
                postal_service_id: ''
            },
            countries: [],
            cities: {},
            postals: [],
            FieldTypes,
            isLoading: false,
            orderFinished: false,
            CheckMark
        };
    },
    computed: {
        ...mapGetters(['itemInBasket', 'isUserLogged', 'orderTotal', 'user']),
        circleClassList() {
            return 'w-6 h-6 rounded-full border border-2 border-indigo-500 text-xl cursor-pointer flex items-center justify-center';
        },
        isAllFieldsHasValue() {
            return Object.values(this.orderFieldValues).findIndex(value => !value) === -1;
        },
        postalOptions() {
            return this.postals.map(postal => ({id: postal.id, title: postal.title}));
        },
        currentPostalServiceOptions() {
            let selectedPostalId = this.orderFieldValues.postal_service;
            if(!selectedPostalId) return [];

            let selectedPostal = this.postals.find(postal => postal.id === selectedPostalId);

            return selectedPostal.postal_services;
        },
        orderFields() {
            let values = this.orderFieldValues;

            let result = {
                name: {
                    title: 'Name',
                    type: FieldTypes.TEXT,
                    value: values.name,
                    disabled: true
                },
                surname: {
                    title: 'Surname',
                    type: FieldTypes.TEXT,
                    value: values.surname,
                    disabled: true
                },
                email: {
                    title: 'Email',
                    type: FieldTypes.TEXT,
                    value: values.email,
                    disabled: true
                },
                phone_number: {
                    title: 'Phone number',
                    type: FieldTypes.TEXT,
                    value: values.phone_number,
                    disabled: true
                },
                country: {
                    title: 'Country',
                    type: FieldTypes.SELECT,
                    value: values.country,
                    options: this.countries,
                    disabled: false
                },
                city: {
                    title: 'City',
                    type: FieldTypes.SELECT,
                    value: values.city,
                    options: this.cities[values.country] || [],
                    disabled: false
                },
                postal_service: {
                    title: 'Postal servise',
                    type: FieldTypes.SELECT,
                    value: values.postal_service,
                    options: this.postalOptions,
                    disabled: false
                },
                postal_service_id: {
                    title: 'Postal servise number',
                    type: FieldTypes.SELECT,
                    value: values.postal_service_id,
                    options: this.currentPostalServiceOptions,
                    disabled: false
                },
            };

            result.city.disabled = !result.country.value;
            result.postal_service_id.disabled = !result.postal_service.value;

            return result;
        },
        itemsForOrder() {
            return this.itemInBasket.map(item => ({id: item.id, number: item.number}));
        },
    },
    mounted() {
        if(!this.isUserLogged) return;

        this.applyDefaultUserData();
        this.getData();
    },
    methods: {
        ...mapActions(['updateItemNumber', 'removeItem', 'clearItems']),
        getData() {
            this.isLoading = true;

            let promises = [
                this.getPostals(),
                this.getCountries()
            ];

            return Promise.all(promises)
                .then(() => {
                    this.isLoading = false;
                });
        },
        getPostals() {
            return getPostals()
                .then(({list}) => {
                    this.postals = list;
                });
        },
        getCountries() {
            return getCountries()
                .then(({list}) => {
                    this.countries = list;
                    this.cities = list.reduce((object, country) => {
                        object[country.id] = country.cities;

                        return object;
                    }, {});
                });
        },
        addOneMore(id, number) {
            this.updateItemNumber({
                itemId: id,
                number: number + 1
            });
        },
        removeOne(id, number) {
            if(number > 1) {
                this.updateItemNumber({
                    itemId: id,
                    number: number - 1
                });
            }
        },
        removeFromBasket(id) {
            this.removeItem(id);
        },
        onPropertyChanged(property) {
            const {key, value} = property;

            if(this.orderFieldValues.hasOwnProperty(key)) {
                switch(key) {
                    case 'country': {
                        this.orderFieldValues.city = null;
                        break;
                    }
                    case 'postal_service': {
                        this.orderFieldValues.postal_service_id = null;
                        break;
                    };
                }

                this.orderFieldValues[key] = value;
            }
        },
        applyDefaultUserData() {
            this.orderFieldValues.name = this.user.name;
            this.orderFieldValues.surname = this.user.surname;
            this.orderFieldValues.phone_number = this.user.phone_number;
            this.orderFieldValues.email = this.user.email;
        },
        onOrderButtonClick() {
            if(!this.isAllFieldsHasValue) return;

            this.isLoading = true;
            let orderInfo = {
                user_id: this.user.id,
                city_id: this.orderFieldValues.city,
                postal_service_id: this.orderFieldValues.postal_service_id,
                items: this.itemsForOrder
            };

            return createOrder(orderInfo)
                .then(() => {
                    this.clearItems();
                    this.orderFinished = true;
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },
    },
}
</script>