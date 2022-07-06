<template>
  <div>
    <div class="wrapper flex h-full">
        <sub-header-item
          v-for="item in navigationItems"
          :key="item.id"
          :title="item.title"
          :sub-items="item.subItems"
          class="h-full px-5"/>
    </div>
  </div>
</template>

<script>
import SubHeaderItem from '@/components/Molecules/SubHeader/SubHeaderItem';

export default {
    components: {
        SubHeaderItem
    },
    props: {
        navigationItems: {
            type: Array,
            required: true,
            default: () => []
        },
    },
};

</script>