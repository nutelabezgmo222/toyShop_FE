<template>
  <div class="flex flex-col items-center justify-center">
    <div class="dots-bars" />
    <h3 class="text-emerald-600">
      Loading{{ dotsToHtml }}
    </h3>
  </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            numberOfDots: 1
        }
    },
    computed: {
        dotsToHtml() {
            return Array(this.numberOfDots).fill('.').join('');
        },
    },
    mounted() {
        this.setTimer();
    },
    unmounted() {
        this.destroyTimer();
    },
    methods: {
        setTimer() {
            this.timer = setInterval(() => {
                this.numberOfDots = this.numberOfDots >= 3 ? 1 : this.numberOfDots + 1;
            }, 1000);
        },
        destroyTimer() {
            clearInterval(this.timer);
        },
    },
}
</script>

<style>
.dots-bars {
    width: 40px;
    height: 26px;
    --c: linear-gradient(lightgreen 0 0);
    background:
      var(--c) 0    100%,
      var(--c) 50%  100%,
      var(--c) 100% 100%;
    background-size:8px calc(100% - 4px);
    background-repeat: no-repeat;
    position: relative;
}
.dots-bars:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: lightgreen;
    left:0;
    top:0;
    animation: 
      db3-1 1.5s  linear infinite alternate,
      db3-2 0.75s cubic-bezier(0,200,.8,200) infinite;
}

@keyframes db3-1 {
    100% {
        left:calc(100% - 8px);
    }
}

@keyframes db3-2 {
    100% {
        top:-0.1px;
    }
}

</style>