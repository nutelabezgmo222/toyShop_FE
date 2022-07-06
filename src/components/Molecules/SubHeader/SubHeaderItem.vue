<template>
  <div 
    class="flex relative items-center justify-center last:border-r-2 border-l-2 border-zinc-700 hover:bg-blue-300 cursor-pointer transition"
    @mouseleave="onMouseLeave"
    @mouseover="onMouseOver">
    <p>{{ title }}</p>
    <div
      v-if="displaySubHeader && subItems && subItems.length"
      class="absolute bg-green-300 bottom-0 left-0 translate-y-full w-56 border border-zinc-500 drop-shadow-lg">
      <ul>
        <li
          v-for="subItem in subItems"
          :key="subItem.key"
          class="border-b-2 border-zinc-700" >
          <router-link
            class="block py-3 px-7 text-left hover:bg-blue-300 transition"
            :to="subItem.path">
            {{ subItem.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            default: ''
        },
        subItems: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            displaySubHeader: false
        };
    },
    mounted() {
        if(this.subItems && this.subItems.length) {
            
        }
    },
    methods: {
        onMouseOver() {
            this.displaySubHeader = true;
        },
        onMouseLeave() {
            this.displaySubHeader = false;
        },
    },
};
</script>