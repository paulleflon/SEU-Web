<script setup>
import {ref} from 'vue';
const tasks = ref([]);
</script>
<template>
	<nav>
		<RouterLink to='/'>Home</RouterLink>
		<RouterLink to='/new'>Add Todo</RouterLink>
	</nav>
	<RouterView v-slot='{ Component }'>
		<Transition name='blur' mode='out-in'>
			<component :is='Component' :tasks='tasks' />
		</Transition>
	</RouterView>
</template>
<style scoped>
nav {
	z-index: 10000;
	position: sticky;
	top: 10px;
	width: 80%;
	left: 10%;
	background-color: var(--emerald-400);
	padding: 20px 10px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	gap: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	& a {
		color: white;
		font: 14pt Arial;
		display: block;
		text-decoration: none;
		padding: 6px 10px;
		border-radius: 7px;
		transition: background .3s ease;

		&:hover {
			background: var(--emerald-500);
		}
	}
}

.blur-enter-active,
.blur-leave-active {
	transition: .2s ease;
}

.blur-enter-from,
.blur-leave-to {
	filter: blur(50px);
	opacity: 0;
	transform: translateY(-40px);
}
</style>
