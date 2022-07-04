<template>
  <div class="flex flex-col p-5 border rounded bg-white">
    <img
      class="max-w-full"
      :src="image"
      :alt="title">
    <div class="flex justify-between mt-2">
      <span>
        rating {{ rating }}
      </span>
      <span>
        {{ comments.length }} comments
      </span>
    </div>
    <div>
      <p class="text-left">
        {{ title }}
      </p>
    </div>
    <div class="mt-5 flex justify-between">
      <span>{{ price }} <span class="text-sm">UAH</span></span>
      <span />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            default: ''
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true,
            default: ''
        },
        image: {
            type: String,
            required: true,
            default: ''
        },
        rating: {
            type: Number,
            required: false,
            default: 1,
            validator: (rating) => { return rating >= 0 && rating <= 5}
        },
        comments: {
            type: Array,
            required: false,
            default: () => []
        },
    },
}
</script>