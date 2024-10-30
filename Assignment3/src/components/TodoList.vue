<script setup>
import TodoItem from './TodoItem.vue';
defineProps({
	tasks: Array
});
</script>
<template>
	<div class='box'>
		<h1>To-do list</h1>
		<div v-if='tasks.length' class='todo-list'>
			<TodoItem v-for='task of tasks' :id='task.id' v-model='task.checked' :title='task.title'
				:content='task.content'></TodoItem>
		</div>
		<div class='no-task' v-else>
			<h2>Nothing to see here!</h2>
			<p>Click &apos;Add todo&apos; to add your first task on the list!</p>
		</div>
		<div class='stats' v-if='tasks.length'>
			<span>To do: {{ tasks.filter(t => !t.checked).length }} • Done : {{ tasks.filter(t => t.checked).length
				}}</span>
		</div>
	</div>
</template>


<style scoped>
.todo-list div {
	margin: 20px auto;
}

.stats {
	text-align: center;
	font: 10pt Arial;
	color: #aaa;
}

.no-task {
	text-align: center;
	opacity: .6;

	& h2 {
		font: bold 16pt Arial;
	}

	& p {
		font: 12pt Arial;
	}
}
</style>