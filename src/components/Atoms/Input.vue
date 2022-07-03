<template>
  <div class="form_element mb-4">
		<label>
			<p>{{ title }} </p>
			<input
				:class="{error: error}"
				:type="type"
				:value="value"
				v-model="inputValue" />
		</label>
  </div>
</template>

<script>
export default {
    name: 'Input',
    // note: 'option item should have id and title props: options = [{id:1 , title: "option title"}]',
    props: {
				type: {
						type: String,
						default: 'text',
						requred: true
				},
				title: {
						type: String,
						default: 'Selector',
						requred: true
        },
        value: {
            type: [String, Number],
            default: "",
            required: false,
            note: 'value of input'
        },
        error: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    emits: ['input'],
    data() {
        return {
            inputValue: null
        };
    },
    watch: {
        inputValue(newValue) {
					console.log(newValue);
            this.$emit('input', newValue);
        },
    },
    // mounted() {
    //     if(this.selectedByDefault) {
    //         this.selectedOption = this.selectedByDefault;
    //     }
    // },
}
</script>