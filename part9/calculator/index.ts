import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: 'Provided values were not numbers!' });
      return;
    }

    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch {
    res.status(400).json({ error: 'Provided values were not numbers!' });
  }
});
