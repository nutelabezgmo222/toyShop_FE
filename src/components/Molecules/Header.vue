<template>
  <header>
    <div class="wrapper">
      <div class="logo_wrapper">
        <img :src="logo" alt="logo">
        <span class="logo_title">{{ projectTitle }}</span>
      </div>
      <nav>
        <router-link
          v-for="link in links"
          :key="link.title"
          :to="link.to"
          class="navigation_link">
          {{ link.title }}
        </router-link>
      </nav>
      <div>
        <Button button-text="Log in" />
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
  header {
      position: fixed;
      height: 70px;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
  }

  .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
  }

  .logo_wrapper img {
      width: 30px;
      height: 30px;
  }

  nav {
      flex-grow: 1;
      display: flex;
      justify-content: center;
  }

  .router-link-active {
      background-color: #ECECFF;
  }

  .navigation_link {
      margin-left: 10px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      padding: 20px;
  }

  .navigation_link:hover {
      background-color: #ECECFF;
  }
</style>