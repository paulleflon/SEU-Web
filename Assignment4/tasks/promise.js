import {readFile, existsSync} from 'fs';
import {readFile as readFilePromise} from 'fs/promises';
export default {
	index: 4,
	name: 'Callbacks and Promises',
	run: async (rl) => {
		const filename = await rl.question('Enter the file name to read: ');
		if (!existsSync(filename)) {
			console.log('This file does not exist.');
			return;
		}
		readFile(filename, (err, data) => {
			if (err) {
				console.log('An error occured:');
				console.err(err);
				return;
			}
			console.log(`File content (callback): ${data}`);
		});
		try {
			const data = await readFilePromise(filename);
			console.log(`File content (promise): ${data}`);
		} catch (err) {
			console.log('An error occured:');
			console.err(err);
		}
	}
};