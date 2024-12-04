import express from 'express';
import {modelPredict} from '../server/handler';

const router = express.Router();

router.post('/predict', modelPredict)

module.exports = router;