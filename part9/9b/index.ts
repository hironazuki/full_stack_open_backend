import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator, parseArguments2 } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateBmi(height, weight);
  res.send({ height, weight, result });
});

app.post('/bmi', (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;
  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }
  const body: number[] = [target, ...daily_exercises];
  try {
    console.log(body);
    const test = parseArguments2(body);
    console.log(test);
  } catch (e) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const result = exerciseCalculator(body);
  res.json(result);
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
