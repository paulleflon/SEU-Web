<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import InputField from './InputField.vue';
const router = useRouter();
const props = defineProps({
	tasks: Array
});

const title = ref();
const content = ref();

const send = () => {
	if (!title.value || !title.value.trim())
		return alert('Please enter a correct title');
	if (!content.value || !content.value.trim())
		return alert('Please enter a correct content');
	const id = props.tasks.length ? props.tasks[props.tasks.length - 1].id + 1 : 1;
	props.tasks.unshift({
		id,
		title,
		content,
		checked: false
	});
	router.push('/');
}

</script>

<template>
	<div class='box'>
		<h1>Add Task</h1>
		<InputField id='title' v-model='title' label='Title'></InputField>
		<InputField id='content' v-model='content' label='Content'></InputField>
		<div class='center'>
			<button @click='send'>Add Todo</button>
		</div>
	</div>
</template>

<style scoped>
.center {
	text-align: center;
}
</style>