import express from 'express';

const app = express();
const port = 3000;

app.use((req, res, next) => {
	console.log(`${new Date().toUTCString()} ${req.method} - ${req.path} - ${req.ip}`);
	next();
});


app.get('/', (req, res) => {
	res.send('Hello from Express!');
});

app.get('/greet', (req, res) => {
	res.json({
		message: 'Welcome to the Node.js server!'
	});
});

app.get('/time', (req, res) => {
	res.send(`Current time is: ${new Date().toISOString()}`);
});
app.all('/stop', (req, res) => {
	console.log('Closing server... This make take a few seconds...');
	res.send('Closing server... This make take a few seconds...');
	server.close(); // Since this event can only be fired when the server is running, the variable server is always defined here.
});
let server; // Holds the running server that we can stop afterwards.
export default {
	index: 3,
	name: 'Express Server',
	run: () => {
		return new Promise((resolve, reject) => {
			server = app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}\nSend a request to /stop to stop it.`);
				resolve();
			}).on('error', reject);
		});
	}
};