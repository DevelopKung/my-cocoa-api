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

// const apiRouter = require('./router/index.router');
// app.use('/', apiRouter);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello world', corsOptions })
})

if (config.server_port === 443) {
  // serve the API with signed certificate on 443 (SSL/HTTPS) port
  const https = require('https');
  const httpsServer = https.createServer({
    key: fs.readFileSync(config.server_key_file),
    cert: fs.readFileSync(config.server_cert_file),
  }, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
} else {
  const http = require('http');
  const httpServer = http.createServer(app);
  httpServer.listen((process.env.PORT || 8001), () => {
    console.log('HTTP Server running on port ');
    console.log('API base path ');
  });
}