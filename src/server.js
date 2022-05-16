const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoute = require('./routes/userRoutes');
const { showBody } = require('./middleware');

const app = express();

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(showBody);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Howdy');
});

// Routes

app.use('/', userRoute);

// 404 turetu grazinti json objekta
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server online on port', PORT));