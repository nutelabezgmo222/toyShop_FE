<template>
  <div>
    <h1 class="text-4xl font-bold mb-3">
      Profile
    </h1>
    <div class="flex items-start">
      <div class="w-1/6 mr-5 border border-black rounded p-5 flex flex-col">
        <router-link
          class="p-3 border border-2 mb-3"
          to="/profile/info">
          My info
        </router-link>
        <router-link
          class="p-3 border border-2 mb-3"
          to="/profile/orders">
          My orders
        </router-link>
      </div>
      <div class="w-5/6 border border-black rounded p-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
    .router-link-active {
        background-color: #ddd;
        color: black;
        font-weight: bold;
        border-color: black;
    }

</style>