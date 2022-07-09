<template>
  <div>
    <h1>Admin page</h1>
    <div class="flex mt-10">
      <nav class="flex flex-col h-96 w-1/4 bg-red-100 mr-10 items-center border rounded">
        <router-link
          v-for="link in links"
          :key="link.route"
          :to="{name: link.route}"
          class="w-5/6 border rounded bg-white mt-4 p-2">
          {{ link.title }}
        </router-link>
      </nav>
      <div>
        <router-view />
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
              { route: 'AdminDelete', title: 'Delete' }
            ]
        }
    },
};
</script>