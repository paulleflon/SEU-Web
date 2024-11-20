import {readdirSync} from 'fs';
import {createInterface} from 'readline/promises';
const rl = createInterface({
	input: process.stdin,
	output: process.stdout
});

async function menu(options) {
	for (let i = 0;i < options.length;i++)
		console.log(`${i + 1}. ${options[i]}`);
	let answer = NaN;
	rl.resume();
	while (isNaN(answer) || answer > options.length || answer < 1) {
		answer = parseInt(await rl.question(`Select which part to run [1-${options.length}]: `));
	}
	rl.pause();
	return answer - 1; // We let the user choose starting from 1, but we rather have a usable array index returned.
}
// Dynamically importing tasks
const files = readdirSync('tasks');
const tasks = Array(files.length);
for (const f of files) {
	const {default: t} = await import(`./tasks/${f}`);
	tasks[t.index] = t;
}
// Adding Exit option in the menu.
tasks.push({
	index: tasks.length,
	'name': 'Exit',
	run: () => {
		console.log('Thanks for reviewing my assignment! - Paul Leflon');
		console.log('=====================================\n');
		process.exit(0);
	}
});

// Main loop
const options = tasks.map(t => t.name);
let isRunning = true;
while (isRunning) {
	const choice = await menu(options);
	console.log(`\n=========== Running Part ${choice + 1} ==========`);
	try {
		// This await allows for a better UX, otherwise the menu would conflict with the tasks' interactions.
		// However, the Express server can still run while using other tasks, since its task's Promsie resolves
		// when the server starts listening. Thus, we can enjoy the non-blocking and event-driven aspect of Node.js
		await tasks[choice].run(rl);
	} catch (err) {
		if (choice === 3)
			console.log('You cannot run multiple servers at the same time. Please stop the server before running it again.');
		else {
			console.log('An error occured:');
			console.err(err);
		}
	}
	console.log('=====================================\n');
}