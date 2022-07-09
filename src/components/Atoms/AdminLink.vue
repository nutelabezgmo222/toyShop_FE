<template>
  <router-link
    :to="{ name: route }" 
    class="w-5/6 border rounded bg-white mt-4 p-2">
    {{ title }}
  </router-link>
</template>

<script>
export default {
    props: {
        route: {
            type: [String],
            default: "",
            required: true
        },
        title: {
            type: [String],
            default: "",
            required: true
        },
    },
    data() {
        return {
          
        }
    },
};
</script>