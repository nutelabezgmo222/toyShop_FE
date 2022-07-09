<template>
  <div>
    <form class="flex flex-col items-center">
      <input-field
        title="Login"
        type="text"
        :value="login"
        @input="login = $event" />

      <input-field
        title="Password"
        type="password"
        :value="password"
        @input="password = $event" />

      <div>
        <Button
          type="save"
          button-text="Log in"
          class="w-56"
          @click="logIn" />
      </div>

      <div class="flex items-center mt-3">
        <p class="mr-3">
          Dont have an account?
        </p>
        <router-link
          to="/register"
          class="text-sm underline">
          Create a new one
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { logIn } from '@/api/logIn';
import InputField from '@/components/Atoms/InputField';
import Button from '@/components/Atoms/Button.vue';

export default {
    components: {
        InputField,
        Button
    },
    data() {
        return {
            login: '',
            password: ''
        };
    },
    methods: {
        logIn() {
            return logIn(this.getLoginData());
        },
        getLoginData() {
            return {
                login: this.login,
                password: this.password
            };
        }
    },
}
</script>

<style>

</style>