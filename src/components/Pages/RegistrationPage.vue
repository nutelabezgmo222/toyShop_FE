<template>
  <div>
    <h2 class="mb-3 text-xl font-bold">
      Registration form
    </h2>
    <form 
      class="flex flex-col items-center"
      @submit.prevent>
      <notification
        :message="errorMessages"
        class="mb-3" />
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
import { mapGetters, mapActions } from 'vuex';
import { register } from '@/api/logIn';
import InputField from '@/components/Atoms/InputField';
import Button from '@/components/Atoms/Button.vue';
import Notification from '@/components/Atoms/Notification';

export default {
    components: {
        InputField,
        Button,
        Notification
    },
    data() {
        return {
            name: '',
            surname: '',
            phoneNumber: '',

            email: '',
            password: '',
            errorMessages: []
        };
    },
    computed: {
        ...mapGetters(['rememberToken'])
    },
    methods: {
        ...mapActions(['saveUserData']),
        register() {
            return register(this.getUserData())
                .then((response) => {
                    this.saveUserData(response.user);
                    this.$router.push('/');
                }).catch(({response}) => {
                    let errors = Object.values(response.data.response);
                    this.errorMessages = errors.map(items => items.join(', '));
                })
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