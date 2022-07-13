<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="`${width}px`"
    :height="`${height}px`"
    :class="`fill-${fill}`"
    @click="$emit('click', $event)"
    v-html="svg" />
</template>

<script>
import feather from 'feather-icons';

export default {
    name: 'FeatherIcon',
    description: 'FeatherIcon is an icon. By passing the icon prop a svg is created.',
    props: {
        icon: {
            type: String,
            required: true,
            note: 'the name of the feather icon. You can find the list of icons on the website: https://feathericons.com/',
        },
        width: {
            type: [String, Number],
            default: '20',
            note: 'the width of the feather icon',
        },
        height: {
            type: [String, Number],
            default: '20',
            note: 'the height of the feather icon',
        },
        fill: {
            type: String,
            default: 'none',
            note: 'the fill color of the feather icon as tailwind color',
        },
    },
    emits: ['click'],
    computed: {
        svg() {
            const icon = feather.icons[this.icon];
            return icon ? icon.toSvg().match(/<svg.*?>(.*?)<\/svg>/)[1] : undefined;
        },
    },
};
</script>
