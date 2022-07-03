<template>
  <header class="bg-white fixed h-16 inset-x-0 top-0">
    <div class="wrapper flex justify-between items-center h-full">
      <div class="flex">
        <img
          :src="logo"
          class="h-7 w-7"
          alt="logo">
        <span class="logo_title">{{ projectTitle }}</span>
      </div>
      <nav class="flex-grow flex justify-center">
        <router-link
          v-for="link in links"
          :key="link.title"
          :to="link.to"
          class="ml-2 uppercase p-5 navigation_link">
          {{ link.title }}
        </router-link>
      </nav>
      <div>
        <Button type="save" button-text="Log in" />
        <Button button-text="Log out" />
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/assets/images/logo.png';
import Button from '@/components/Atoms/Button';

export default {
    components: {
        Button
    },
    props: {
        links: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            logo: Logo,
            projectTitle: 'Arolee'
        }
    },
}
</script>

<style scoped>
  .router-link-active {
      background-color: #ECECFF;
  }

  .navigation_link:hover {
      background-color: #ECECFF;
  }
</style>