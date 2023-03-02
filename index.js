const config = require('./config/config')
const express = require('express')
const cors = require("cors");
const app = express();

let cosr = process.env.NODE_ENV ? config.allow_cors_url : 'http://localhost:5000'
var corsOptions = {
  origin: [cosr, process.env.ALLOW_CORS_URL_NAME, process.env.CYCLIC_URL],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '20mb', extended: false }))
app.use(express.json({ limit: '20mb' }))

const apiRouter = require('./router/index.router');
app.use('/', apiRouter);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello My Cocoa' })
})

app.listen(process.env.PORT || 8001)

// app.listen(process.env.PORT || 8001)