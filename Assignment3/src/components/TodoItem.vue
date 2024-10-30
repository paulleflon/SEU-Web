<script setup>
import {computed} from 'vue';
const props = defineProps({
	id: Number,
	title: String,
	content: String,
});

const model = defineModel();
const strikeClass = computed(() => `strike ${model.value ? ' visible' : ''}`);
const containerClass = computed(() => `item ${model.value ? ' done' : ''}`);
</script>

<template>
	<div :class='containerClass'>
		<div>
			<input type='checkbox' :id='`todo-${props.id}`' v-model='model' />
			<label :for='`todo-${props.id}`'>
				<span>{{ title }}</span>
				<div :class='strikeClass'></div>
			</label>
		</div>
		<RouterLink :to='`/tasks/${props.id}`'>Edit</RouterLink>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	border: 1px solid #d1d0d0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 10px;
	border-radius: 15px;
	justify-content: space-between;
	align-items: center;
	transition: .3s ease;
	&.done {
		opacity: .5;
		box-shadow: none;
	}
}

.item label {
	position: relative;
	margin-left: 10px;
	font: 12pt Arial;
	cursor: pointer;
}

.item label .strike {
	position: absolute;
	height: 2px;
	background: black;
	top: 50%;
	right: -5px;
	transition: width .3s ease;
	width: 0;

	&.visible {
		left: -5px;
		width: calc(100% + 10px);
	}
}

.item a {
	display: block;
	background: var(--emerald-500);
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	font: 12pt Arial;
	text-decoration: none;
	transition: .1s ease;

	&:hover {
		background: var(--emerald-600);
	}
}
</style>