const express = require('express');
const path = require('path');
const fs = require('node:fs');

const app = express();
const PORT = 3000;

const createPath = (page) => path.resolve('public', 'pages', `${page}.html`);

app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', (req, res) => {
	res.sendFile(createPath('main'));
});

app.get('/game', (req, res) => {
	res.sendFile(createPath('game'));
});

app.listen(PORT, () => {
	console.log(`Server is listening port ${PORT}`);
});
