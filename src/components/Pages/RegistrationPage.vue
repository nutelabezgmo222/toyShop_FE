<template>
  <div>
    <h2 class="mb-3 text-xl font-bold">
      Registration form
    </h2>
    <form 
      class="flex flex-col items-center"
      @submit.prevent>
      <div class="grid grid-cols-2">
        <div class="mr-5">
          <input-field
            title="Name"
            type="text"
            :value="name"
            @input="name = $event" />

          <input-field
            title="Surname"
            type="text"
            :value="surname"
            @input="surname = $event" />

          <input-field
            title="Phone number"
            type="text"
            :value="phoneNumber"
            @input="phoneNumber = $event" />
        </div>
        <div>
          <input-field
            title="Email (will be your login)"
            type="email"
            :value="email"
            @input="email = $event" />

          <input-field
            title="Password"
            type="password"
            :value="password"
            @input="password = $event" />
        </div>
      </div>
      

      <div>
        <Button
          type="save"
          button-text="Register"
          class="w-56"
          @click="register" />
      </div>
    </form>
  </div>
</template>

<script>
import { register } from '@/api/logIn';
import InputField from '@/components/Atoms/InputField';
import Button from '@/components/Atoms/Button.vue';

export default {
    components: {
        InputField,
        Button
    },
    data() {
        return {
            name: '',
            surname: '',
            phoneNumber: '',

            email: '',
            password: ''
        };
    },
    methods: {
        register() {
            return register(this.getUserData());
        },
        getUserData() {
            return {
                name: this.name,
                surname: this.surname,
                phone_number: this.phoneNumber,
                email: this.email,
                password: this.password
            };
        },
    },
}
</script>