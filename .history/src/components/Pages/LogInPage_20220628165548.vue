<template>
  <div>
    <h1>Login</h1>
    <nav>
      <router-link :to="{ name: 'AdminCreate' }">
        Create
      </router-link>
      <router-link :to="{ name: 'AdminDelete' }">
        Delete
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>