const multer = require('multer');
const crypto = require('crypto');
const classfication = require("./services/inference");
const loadModel = require('./services/loadModel');
const { storeData, getData } = require('./services/manageData');

const upload = multer({
  limits: { fileSize: 1000000 },
}).single("image");

async function predict(req, res) {
  try {
    console.log(`Image are received and being validated`);
    await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err) {
          if (
            err instanceof multer.MulterError &&
            err.code === "LIMIT_FILE_SIZE"
          ) {
            return reject({
              status: 413,
              message:
                "Payload content length greater than maximum allowed: 1000000",
            });
          }
          return reject({
            status: 400,
            message: "An error occurred during file upload. Please try again.",
          });
        }
        resolve();
      });
    });
    console.log(`Image successfully uploaded and validated`);

    if (global.model === null) {
      console.log('Model is not loaded. Loading model now...');
      global.model = await loadModel();
    }

    const image = req.file;

    const { score, label, suggestion } = await classfication(global.model, image.buffer);

    console.log(`Model is finished prediction with score ${score}`);

    const data = {
      id: crypto.randomUUID(),
      result: label,
      suggestion,
      createdAt: new Date().toISOString()
    };

    console.log('Saving prediction to database');
    await storeData(data.id, data);
    console.log('Data saved to database');

    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error occurred:", error);

    if (error.status) {
      return res.status(error.status).json({
        status: "fail",
        message: error.message,
      });
    }

    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
}

async function histories(req, res) {
  try {
    const result = await getData();

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan fetch data",
    });
  }
}
module.exports = { predict, histories };