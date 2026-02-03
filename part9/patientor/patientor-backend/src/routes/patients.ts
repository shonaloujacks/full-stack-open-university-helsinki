import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all patients!');
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;