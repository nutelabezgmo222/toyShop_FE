<template>
  <div class="wrapper">
    <Header :links="navigation" />
    <main>
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Header from '@/components/Molecules/Header';

export default {
    name: 'App',
    components: {
        Header
    },
    data() {
        return {
            navigation: [
                { title: 'Home', to: '/' },
                { title: 'Catalog', to: '/catalog' },
                { title: 'Basket', to: '/basket' },
                { title: 'Admin', to: '/admin' },
                {title : 'Log In', to: '/login' },
            ],
        };
    },
};

</script>

<style>
@import '@/assets/css/normalize.css';
@import '@/assets/css/font-awesome.min.css';
@import '@/assets/css/font-awesome.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 70px;
  background-color: #ECECFF;
  min-height: 100vh;
  position: relative;
}
.wrapper {
    max-width: 1000px;
    margin: 0 auto;
}
</style>
