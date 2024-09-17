/* Shorthand methods */
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
/* Important elements */
const createForm = {
	name: $('#create-task [name=\'task-name\']'),	
	deadline: $('#create-task [name=\'task-deadline\']'),	
	priority: $('#create-task [name=\'task-priority\']'),	
	send: $('#create-task [name=\'add-task\']')
};
const editForm = {
	self: $('#edit-task'),
	name: $('#edit-task [name=\'edit-name\']'),	
	deadline: $('#edit-task [name=\'edit-deadline\']'),	
	priority: $('#edit-task [name=\'edit-priority\']'),	
	save: $('#edit-task [name=\'save-edit\']'),
	cancel: $('#edit-task [name=\'cancel-edit\']')
};
const taskLists = {
	low: $('#low-task-list ul'),
	medium: $('#medium-task-list ul'),
	high: $('#high-task-list ul')
};
/* Task Class */
class Task {
	/** @type {String} */
	name;
	/** @type {'low' | 'medium' | 'high'} */
	priority;
	/** @type {Date} */
	deadline;
	/** @type {HTMLLIElement} */
	/** @type {Task[]} */
	static idCount = 1;
	constructor(name, deadline, priority) {
		this.id = Task.idCount++;
		this.name = name;
		this.deadline = deadline;
		this.priority = priority;
		this.element = document.createElement('li');
	}
	/** Display this task and bind its event listeners */
	append() {
		// Escaping string to avoid any XSS
		const name = encodeURIComponent(this.name);
		this.element.id = this.name;
		this.element.className = `task ${this.priority}`;
		const template = `
			<div class='left-group'>
				<input type='checkbox' id='check-${this.id}' />
				<label for='check-${this.id}' class='task-name'>${name}</div>
			</div>
			<div class='middle-group'>Deadline : ${this.deadline.toLocaleDateString('zh-CN').replace(/\//g, '-')}</div>
			<div class='right-group'>
				<input type='button' class='edit-task-button' value='Edit' />
				<input type='button' class='delete-task-button' value='Delete' />
			</div>
		`;
		this.element.innerHTML = template;
		taskLists[this.priority].appendChild(this.element);
		/* Adding event listeners */
		this.element.querySelector('input[type=\'checkbox\']').addEventListener('click', ({target}) => {
			const checked = target.checked;
			console.log(this.name);
			this.element.classList[checked ? 'add' : 'remove']('done');
		});
		this.element.querySelector('.delete-task-button').addEventListener('click', () => {
			if (confirm(`Are you sure you want to delete '${this.name}'?`))
				this.delete();
		});
		this.element.querySelector('.edit-task-button').addEventListener('click', () => {
			this.edit();
		});
	}

	delete() {
		this.element.remove();
	}
	edit() {
		editForm.name.value = this.name;
		editForm.deadline.value = this.deadline.toISOString().slice(0, 10);
		editForm.priority.value = this.priority;
		editForm.self.classList.add('visible');
		const saveListener = () => {
			const name = editForm.name.value.trim();
			const priority = editForm.priority.value;
			const deadline = editForm.deadline.valueAsDate;
			if (!name)
				return alert('Please set a valid name!');
			if (!deadline)
				return alert('Please set a valid deadline!');
			this.name = name;
			this.priority = priority;
			this.deadline = deadline;
			this.delete();
			this.append();
			editForm.self.classList.remove('visible');
			editForm.save.removeEventListener('click', saveListener);
		}
		editForm.save.addEventListener('click', saveListener);
	}

}


/** Add a task */
createForm.send.addEventListener('click', () => {
	const name = createForm.name.value.trim();
	const priority = createForm.priority.value;
	const deadline = createForm.deadline.valueAsDate;
	if (!name)
		return alert('Please set a valid name!');
	if (!deadline)
		return alert('Please set a valid deadline!');
	const newTask = new Task(name, deadline, priority);
	console.log(newTask);
	newTask.append();
});
/** Cancel a task edition */
editForm.cancel.addEventListener('click', () => {
	editForm.self.classList.remove('visible');
});

/* Default value of the Date input */
createForm.deadline.value = new Date().toISOString().slice(0, 10);