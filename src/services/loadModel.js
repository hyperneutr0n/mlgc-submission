import { loadGraphModel } from '@tensorflow/tfjs-node';
 
async function loadModel() {
  return loadGraphModel(process.env.MODEL_URL);
}
 
export default loadModel;