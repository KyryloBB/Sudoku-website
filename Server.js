const express = require('express');
const path = require('path');
const fs = require('node:fs');
const checkSudoku = require('./src/checkSudoku');

const app = express();
const PORT = 3000;

const createPath = (page) => path.resolve('public', 'pages', `${page}.html`);

app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(createPath('main'));
});

app.get('/game', (req, res) => {
	res.sendFile(createPath('game'));
});

app.get('/game/result', (req, res) => {
	res.sendFile(createPath('result'));
});

app.post('/check', (req, res) => {
	const { currentGrid } = req.body;
	const isValid = checkSudoku(currentGrid);
	const redirectUrl = `/game/result?valid=${isValid}`;
	res.json({ redirect: redirectUrl });
});

app.listen(PORT, () => {
	console.log(`Server is listening port ${PORT}`);
});
