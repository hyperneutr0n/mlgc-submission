const tf = require('@tensorflow/tfjs-node');

async function classfication(model, image) {
  if (!model) {
    const error = new Error('Model not found!');
    error.statusCode = 500;
    throw error;
  }
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  console.log('Model started a prediction on the image');
  const prediction = await model.predict(tensor).data();
  const score = prediction[0];
  const label = score > 0.5 ? 'Cancer' : 'Non-cancer';
  const suggestion = label === 'Cancer' ?
    'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';

  tf.dispose(tensor);
  tf.dispose(prediction);

  return { score, label, suggestion };
}

module.exports = classfication;