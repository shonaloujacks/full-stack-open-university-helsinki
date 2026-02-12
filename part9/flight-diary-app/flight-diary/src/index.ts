import express from 'express';
const app = express();
const cors = require('cors')
import diaryRouter from './routes/diaries';

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173']}))

const PORT = 3000;

app.get('api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});