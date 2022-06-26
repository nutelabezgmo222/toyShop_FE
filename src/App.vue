<template>
  <div class="container">
    <h1>Privet mir</h1>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/catalog">
        Catalog
      </router-link>
      <router-link to="/basket">
        Basket
      </router-link>
      <router-link to="/admin">
        Admin
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
    max-width: 1000px;
    margin: 0 auto;
}
</style>
