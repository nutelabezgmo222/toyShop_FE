<template>
  <button :class="type">{{ buttonText }}</button>
</template>

<script>
const ButtonTypes = ['save', 'util'];

export default {
  props: {
      buttonText: {
          type: String,
          required: true
      },
      type: {
          type: String,
          required: false,
          default: 'util',
          validator: (type) => ButtonTypes.includes(type)
      },
  }
}
</script>

<style scoped>
  button {
      padding: 10px 20px;
      border: 0;
      cursor: pointer;
      background: none;
  }
  .save {

  }
  .util {}
</style>