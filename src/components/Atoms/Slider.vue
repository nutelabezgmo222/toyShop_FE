<template>
  <div class="border border-black p-2 flex items-center relative">
    <span
      v-show="currentPosition != 0"
      class="left-arrow cursor-pointer absolute left-0"
      @click="moveLeft"></span>
    <div
      class="flex items-center w-full justify-center">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="border border-indigo-500 p-2 text-sm flex flex-col items-center justify-between mr-3">
        <img
          class="w-32 h-32" 
          :src="item.image"
          :alt="item.title">
        <p>{{ item.title }}</p>
        <p>{{ item.price }} UAH</p>
        <Button
          type="save"
          button-text="Buy"
          @click="addToBasket(item)" />
      </div>
    </div>
    <span
      v-show="currentPosition != maxPosition"
      class="right-arrow cursor-pointer absolute right-0"
      @click="moveRight"></span>
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
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        showAtOnce: {
            type: Number,
            required: false,
            default: 5
        },
        speed: {
            type: Number,
            required: false,
            default: 2
        },
    },
    data() {
        return {
            currentPosition: 0,
        };
    },
    computed: {
        visibleItems() {
            return this.items.slice(this.currentPosition, this.currentPosition + this.showAtOnce);
        },
        maxPosition() {
            return this.items.length - 1 - this.showAtOnce < 0 ? 0 : this.items.length - 1 - this.showAtOnce;
        }
    },
    methods: {
        ...mapActions(['addItem']),
        moveRight() {
            if(this.currentPosition + this.speed < this.maxPosition) {
                this.currentPosition += this.speed;
            } else {
                this.currentPosition = this.maxPosition;
            }
        },
        moveLeft() {
            if(this.currentPosition - this.speed >= 0) {
                this.currentPosition -= this.speed;
            } else {
                this.currentPosition = 0;
            }
        },
        addToBasket(item) {
            this.addItem(this.getItemInfo(item));
        },
        getItemInfo(item) {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                description: item.description,
                image: item.image,
                number: 1
            };
        },
    },
}
</script>

<style scoped>
    .left-arrow {
        border-right: 30px solid black;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
    }
    .right-arrow {
        border-left: 30px solid black;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
    }
</style>