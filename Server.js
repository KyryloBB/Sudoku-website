const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
	res.send('It is working');
});

app.listen(PORT, () => {
	console.log(`Server is listening port ${PORT}`);
});
