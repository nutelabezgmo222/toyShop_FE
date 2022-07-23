<template>
  <div>
    <h2 class="text-xl mb-5">
      Info page
    </h2>
    <div class="mb-5">
      <form-builder
        class="flex flex-col"
        :fields="infoFields" />
    </div>
    <div>
      <Button
        type="save"
        button-text="Save changes"
        @click="onSave" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FormBuilder from '@/components/Molecules/FormBuilder';
import Button from '@/components/Atoms/Button';

import { FieldTypes } from '@/utils/FieldTypes';

export default {
    components: {
        FormBuilder,
        Button
    },
    data() {
        return {
            infoFieldValues: {
                name: '',
                surname: '',
                email: '',
                phone_number: '',
            },
            FieldTypes,
        };
    },
    computed: {
        ...mapGetters(['user', 'isUserLogged']),
        infoFields() {
            let values = this.infoFieldValues;

            let result = {
                name: {
                    title: 'Name',
                    type: FieldTypes.TEXT,
                    value: values.name,
                    disabled: false
                },
                surname: {
                    title: 'Surname',
                    type: FieldTypes.TEXT,
                    value: values.surname,
                    disabled: false
                },
                email: {
                    title: 'Email',
                    type: FieldTypes.TEXT,
                    value: values.email,
                    disabled: true
                },
                phone_number: {
                    title: 'Phone number',
                    type: FieldTypes.TEXT,
                    value: values.phone_number,
                    disabled: false
                },
            };

            return result;
        },
    },
    mounted() {
        if(!this.isUserLogged) return;

        this.applyDefaultUserData();
    },
    methods: {
        onSave() {
            console.log(123);
        },
        applyDefaultUserData() {
            this.infoFieldValues.name = this.user.name;
            this.infoFieldValues.surname = this.user.surname;
            this.infoFieldValues.phone_number = this.user.phone_number;
            this.infoFieldValues.email = this.user.email;
        },
    },
}
</script>
