import {setTimeout as asyncTO} from 'timers/promises';
async function timeoutLog(message, delay = 0) {
	return setTimeout(console.log.bind(this, message), delay);
}

export default {
	index: 1,
	name: 'Event Loop & Asynchronous Operations',
	run: async () => {
		console.log('Message 1: This runs first');
		timeoutLog('Message 2: This runs after 1 second', 1000);
		timeoutLog('Message 3: This runs after 3 seconds', 3000);
		timeoutLog('Message 4: This runs second, right after Message 1');
		// This async timeout allows us to await this function in the main program
		// which makes it easier to render a prettier result on the terminal.
		return asyncTO(3001,() => null);
	}
}