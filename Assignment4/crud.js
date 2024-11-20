import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let autoIncrement = 1;
const ITEMS = [];

app.use((req, res, next) => {
	console.log(`${req.method} - ${req.path}`);
	next();
});

app.post('/api/items', (req, res) => {
	const {name} = req.body;
	if (!name)
		return res.status(400).send('Please provide a "name"');
	const obj = {
		id: autoIncrement++,
		name
	};
	ITEMS.push(obj);
	res.status(201).json(obj);
});

app.get('/api/items', (req, res) => {
	res.json(ITEMS);
});

app.get('/api/items/:id', (req, res) => {
	const item = ITEMS.find(item => item.id === parseInt(req.params.id));
	if (!item) return res.status(404).send(`Item with id ${req.params.id} does not exist.`);
	res.json(item);
});

app.put('/api/items/:id', (req, res) => {
	const item = ITEMS.find(item => item.id === parseInt(req.params.id));
	if (!item) return res.status(404).send(`Item with id ${req.params.id} does not exist.`);
	const {name} = req.body;
	if (!name)
		return res.status(400).send('Please provide a "name"');
	item.name = name;
	res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
	const index = ITEMS.findIndex(item => item.id === parseInt(req.params.id));
	if (index === -1) return res.status(404).send(`Item with id ${req.params.id} does not exist.`);
	const deletedItem = ITEMS.splice(index, 1);
	res.json(deletedItem);

});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});