<template>
  <div>
    <div
      v-for="option in options"
      :key="option.value"
      class="flex mb-1">
      <input 
        type="checkbox"
        class="mr-2"
        :checked="selected.includes(option.value)"
        @change="onChange($event, option)">
      <p>{{ option.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        selected: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    emits: ['update'],
    methods: {
        onChange(event, option) {
            let isChecked = event.target.checked;

            this.$emit('update', {...option, isChecked});
        }
    },
}
</script>