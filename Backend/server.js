const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 8000;

const jsonString =
  '[{"Name":"Birnen","Haltbarkeit":"2023-05-04"},{"Name":"Äpfel","Haltbarkeit":"2023-05-13"},{"Name":"Salat","Haltbarkeit":"2023-05-19"},{"Name":"Kirschen","Haltbarkeit":"2023-05-09"}]';

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// const upload = multer({ dest: "./images/" });
const storage = multer.diskStorage({
  destination: "./images/",
  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("image"), (request, response) => {
  console.log(request.body, request.file);
  response.send(jsonString);
});

app.listen(port, () => console.info("Server läuft!"));
