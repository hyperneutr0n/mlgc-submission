const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const loadModel = require('./services/loadModel');

const app = express();

const PORT = process.env.PORT || 3000;

global.model = null;

app.use(cors());
app.use(express.json());

app.use('/predict', routes);

(async function initialize() {
  console.log('Loading up model');
  global.model = await loadModel();
})();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});