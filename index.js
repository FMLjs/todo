const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log('Listening at 9000'));
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('index.html'));