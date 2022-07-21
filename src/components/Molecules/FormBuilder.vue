<template>
  <div>
    <div
      v-for="key in fieldKeys"
      :key="key">
      <div v-if="fields[key].type === FieldTypes.TEXT || fields[key].type === FieldTypes.NUMBER">
        <input-field
          :title="fields[key].title"
          :type="fields[key].type"
          :value="fields[key].value"
          :disabled="fields[key].disabled"
          @input="$emit('propertyChanged', { key, value: $event })" />
      </div>
      <div v-if="fields[key].type === FieldTypes.SELECT">
        <select-filed 
          :title="fields[key].title"
          :disabled="fields[key].disabled"
          :options="fields[key].options"
          :selected-by-default="fields[key].value"
          @updated="$emit('propertyChanged', { key, value: $event })" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectFiled from '@/components/Atoms/SelectFiled';
import InputField from '@/components/Atoms/InputField';

import { FieldTypes } from '@/utils/FieldTypes';

export default {
    components: {
        SelectFiled,
        InputField
    },
    props: {
        fields: {
            type: Object,
            required: true
        },
    },
    emits: ['propertyChanged'],
    data() {
        return {
            FieldTypes
        };
    },
    computed: {
        fieldKeys() {
            return Object.keys(this.fields);
        },
    },
}
</script>