const env = require('dotenv').config()
const config = {
  server_port: process.env.PORT || 8001,
  server_key_file: process.env.SSL_CERT_FILE,
  server_cert_file: process.env.SSL_KEY_FILE,
  server_api_prefix_path: process.env.API_PREFIX_PATH || '',
  jwt_secret: process.env.JWT_SECRET || 'jwt_secret_key',
  mongo_db: process.env.MONGO_DB,
  allow_cors_url: process.env.ALLOW_CORS_URL,
  url_api: process.env.URL_API
}

module.exports = config