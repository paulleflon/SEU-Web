import {existsSync, readFileSync, writeFileSync} from 'fs';

export async function yesno(rl, question) {
	const YES = ['y', 'yes', 'ok', 'true', '1'];
	const NO = ['n', 'no', 'false', '0', 'exit'];
	let answer = null;
	rl.resume();
	while (!YES.includes(answer) && !NO.includes(answer))
		answer = (await rl.question(`${question} [Y/N]: `)).toLowerCase();
	rl.pause();
	if (answer === 'exit') process.exit(0);
	return YES.includes(answer);
}

export default {
	index: 2,
	name: 'File Operation',
	run: async (rl) => {
		let filename;
		while (!filename)
			filename = await rl.question('Enter the file name: ');
		if (existsSync(filename)) {
			console.log(`${filename} already exists. If you proceed, this file's contents will be erased forever.`);
			const proceed = await yesno(rl, 'Do you want to proceed?');
			if (!proceed)
				return console.log('Aborting...');
		}
		const content = await rl.question(`Enter the content to write into ${filename}: `);
		try {
			writeFileSync(filename, content);
			console.log(`File '${filename}' written successfully!`);
			const readFromFile = readFileSync(filename);
			console.log(`File content: ${readFromFile}`);
		} catch (err) {
			console.log(`Something went wrong will accessing ${filename}`);
			console.log('Error:');
			console.log(err);
		}
	}
};