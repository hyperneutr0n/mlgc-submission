const tf = require('@tensorflow/tfjs-node');

const MODEL_URL = 'https://storage.googleapis.com/submissionmlgc-ml-model/models/model.json';

async function loadModel() {
  const model = await tf.loadGraphModel(MODEL_URL);
  console.log('Model loaded successfully');
  return model;
}

module.exports = loadModel;