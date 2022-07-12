<template>
  <transition>
    <div
      v-if="notificationMessage"
      class="p-5"
      :class="[{'bg-red-300': type === 'error'}]">
      {{ notificationMessage }}
    </div>
  </transition>
</template>

<script>
const Types = ['error', 'success'];

export default {
    props: {
        type: {
            type: String,
            required: false,
            default: 'error',
            validator: (newType) => Types.includes(newType)
        },
        message: {
            type: String,
            required: false,
            default: '',
        },
        hideAfter: {
            type: [String, Number],
            required: false,
            default: '0',
            note: 'miliseconds'
        },
    },
    data() {
        return {
            notificationMessage: '',
            timer: null
        };
    },
    watch: {
        message(newMessage) {
            this.initMessage(newMessage);
        },
    },
    mounted() {
        
    },
    methods: {
        initMessage(message) {
            this.notificationMessage = message;
            clearTimeout(this.timer);

            if(this.hideAfter) {
                this.timer = setTimeout(() => {
                    this.notificationMessage = '';
                }, this.hideAfter);
            }
        }
    }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>