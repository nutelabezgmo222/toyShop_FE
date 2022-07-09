<template>
  <div>
    <h1>Admin page</h1>
    <div class="flex mt-10">
      <nav class="flex flex-col h-96 w-1/4 bg-red-100 mr-10 items-center border rounded">
        <admin-link
          route="AdminCreate"
          title="Create" />
        <admin-link
          route="AdminDelete"
          title="Delete" />
      </nav>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminLink from '@/components/Atoms/AdminLink';

export default {
    components: {
      AdminLink
    },
    data() {
        return {
          
        }
    },
};
</script>