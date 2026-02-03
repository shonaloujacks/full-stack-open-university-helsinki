import express from 'express';
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5174', 'http://127.0.0.1:5174']}))

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});