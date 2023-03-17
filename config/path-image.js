const path = require('path')

const path_img = {
  full_path_image: path.join(__dirname, "../uploads"),
  url_full_path_image: process.env.NODE_ENV == 'production' ? process.env.CYCLIC_URL : 'http://localhost:8001',
}

module.exports = path_img