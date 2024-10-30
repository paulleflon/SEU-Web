<script setup>
import {ref} from 'vue';
const model = defineModel();
const props = defineProps({
	label: String,
	id: String,
	type: {
		type: String,
		default: 'text'
	}
});

</script>
<template>
	<div class='input-field'>
		<label :for='props.id'>{{ label }}</label>
		<input :id='props.id' v-model='model' type='text' :placeholder='`Enter ${props.id}`' />
	</div>
</template>


<style scoped>
.input-field {
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}

.input-field label {
	margin-bottom: 0.5rem;
	font: bold 12pt Arial;
}

.input-field input {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>