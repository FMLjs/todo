const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log('Listening at 3000'));
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('public/index.html'));