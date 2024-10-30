<script setup>
import {useRouter} from 'vue-router';
import {ref, watchEffect} from 'vue';
import InputField from './InputField.vue';
const props = defineProps({
	tasks: Array
});
const router = useRouter();

const id = ref(router.currentRoute.value.params.id);
const task = ref(null);
const title = ref('');
const content = ref('');
watchEffect(() => {
	id.value = router.currentRoute.value.params.id;
	task.value = props.tasks.find(t => t.id == id.value); // We allow non-strict equality here
	if (!task.value) {
		router.push('/');
	} else {
		title.value = task.value.title;
		content.value = task.value.content;
	}
});


const save = () => {
	if (!title.value || !title.value.trim())
		return alert('Please enter a title');
	if (!content.value || !content.value.trim())
		return alert('Please enter a content');
	task.value.title = title.value;
	task.value.content = content.value;
	router.push('/');
};

const back = () => router.push('/');

</script>
<template>
	<div class='box'>
		<h1>{{ title || '&zwnj;' }}</h1>
		<h2>{{ content || '&zwnj;' }}</h2>
		<InputField v-model='title' label='Title' id='title' />
		<InputField v-model='content' label='Content' id='content' />
		<div class='bottom-bar'>
			<button @click='save'>Save</button>
			<button @click='back'>Cancel</button>
		</div>
	</div>
</template>
<style scoped>
.bottom-bar {
	display: flex;
	justify-content: end;
	gap: 10px;
}

h2 {
	font: 14pt Arial;
	text-align: center;
}
</style>