<template>
  <button>{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
      buttonText: {
          type: String,
          required: true
      }
  }

}
</script>

<style>

</style>