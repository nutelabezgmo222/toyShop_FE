<template>
  <div>
    <div 
      class="flex items-center justify-between"
      @click="isContentVisible = !isContentVisible">
      <h3>{{ title }}</h3>
      <feather-icon
        :icon="isContentVisible ? 'chevron-down' : 'chevron-up'"
        class="stroke-2 text-blue-700x" />
    </div>
    <div v-show="isContentVisible">
      <slot />
    </div>
  </div>
</template>

<script>
import FeatherIcon from '@/components/Atoms/FeatherIcon';

export default {
    components: {
        FeatherIcon
    },
    props: {
        title: {
            type: String,
            required: true,
            default: ''
        },
        defaultVisibility: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            isContentVisible: true
        };
    },
    mounted() {
        this.isContentVisible = this.defaultVisibility;
    },
}
</script>