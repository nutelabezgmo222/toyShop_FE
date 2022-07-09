<template>
  <div class="wrapper py-16">
    <Header
      class="h-16"
      :links="navigation" />
    <main class="w-full">
      <router-view class="w-full py-16" />
    </main>
    <Footer class="h-16" />
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
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ECECFF;
  min-height: 100vh;
  position: relative;
}
.wrapper {
    max-width: 1200px;
    margin: 0 auto;
}
.form_element select, .form_element input {
    width: 300px;
    border-radius: 5px;
    border: 1px solid black;
}
.form_element select.error, .form_element input.error {
    border-color: #FF5F5F;
}
.form_element select {
  padding: 8px;
}
.form_element input {
  padding: 5px;
}
</style>
