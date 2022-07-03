<template>
  <div class="wrapper">
    <Header :links="navigation" />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Molecules/Header';
import Footer from '@/components/Molecules/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            navigation: [
                { title: 'Home', to: '/' },
                { title: 'Catalog', to: '/catalog' },
                { title: 'Basket', to: '/basket' },
                { title: 'Admin', to: '/admin' },
            ],
        };
    },
};

</script>

<style>
@import '@/assets/css/normalize.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ECECFF;
  min-height: 100vh;
  position: relative;
}
.wrapper {
    max-width: 1000px;
    margin: 0 auto;
}
</style>
