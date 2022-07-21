<template>
  <div class="form_element mb-4">
    <label>
      <p>{{ title }} </p>
      <select
        v-model="selectedOption"
        :disabled="disabled"
        :class="{error: error}">
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.id">
          {{ option.title }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
    name: 'Select',
    note: 'option item should have id and title props: options = [{id:1 , title: "option title"}]',
    props: {
        options: {
            type: Array,
            default: () => [],
            required: true,
            note: 'options for select'
        },
        title: {
            type: String,
            default: 'Selector',
            requred: true
        },
        selectedByDefault: {
            type: [String, Number],
            default: null,
            required: false
        },
        error: {
            type: Boolean,
            default: false,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    emits: ['updated'],
    data() {
        return {
            selectedOption: null
        };
    },
    watch: {
        selectedOption(newValue) {
            this.$emit('updated', newValue);
        },
        selectedByDefault(newValue) {
            if(newValue !== this.selectedOption) {
                this.selectedOption = newValue;
            }
        }
    },
    mounted() {
        if(this.selectedByDefault) {
            this.selectedOption = this.selectedByDefault;
        }
    },
}
</script>