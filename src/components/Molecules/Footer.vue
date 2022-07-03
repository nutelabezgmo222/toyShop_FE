<template>
  <footer>
    <div class="wrapper">
      <p>Powered by <span class="team-logo">Kotleta team</span></p>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style>
  footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 70px;
      background-color: #C0C0CE;
  }
  .wrapper {
      display: flex;
  }
  .team-logo {
      text-transform: uppercase;
      font-style: italic;
  }
</style>