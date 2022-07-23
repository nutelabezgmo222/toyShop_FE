<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">
      Admin page
    </h1>
    <div class="flex items-start">
      <nav class="flex flex-col w-1/6 mr-7 border border-black rounded p-5">
        <router-link
          v-for="link in links"
          :key="link.route"
          :to="{name: link.route}"
          class="border rounded bg-white mt-4 p-2">
          {{ link.title }}
        </router-link>
      </nav>
      <div class="w-5/6">
        <router-view class="w-full" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
              { route: 'AdminCreate', title: 'Create' },
              { route: 'AdminOrders', title: 'Orders' }
            ]
        }
    },
};
</script>

<style scoped>
    .router-link-active {
        background-color: #ddd;
        color: black;
        font-weight: bold;
        border-color: black;
    }
</style>