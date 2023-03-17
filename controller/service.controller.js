const CYCLIC_BUCKET_NAME = process.env.CYCLIC_BUCKET_NAME;
const fs = require('@cyclic.sh/s3fs')(CYCLIC_BUCKET_NAME)
const config = require('./../config/path-image')
const pathImage = config.full_path_image+'/products'
const path = require('path')

module.exports = {
  create: async(req, res) => {
    let file = req.file
    let form = req.body
    
    if (!fs.existsSync(config.full_path_image)) {
      fs.mkdirSync(config.full_path_image, { recursive: true });
    }

    if (!fs.existsSync(pathImage)) {
      fs.mkdirSync(pathImage, { recursive: true });
    }
    
    let newFileName = `${file.originalname.split('.')[0]}-${Date.now()}`
    let fileName = file.originalname.split('.')[0]
    let fileExt = file.originalname.split('.')[1]
    let newPath = `${pathImage}/${newFileName}.${fileExt}`
    let buffer = file.buffer
    await fs.writeFile(newPath, buffer, async(err) => { if (err) return err; })

    let data = {
      name: fileName,
      newName: newFileName,
      ext: fileExt,
      newPath: config.url_full_path_image + '/products/' + newFileName + '.' + fileExt,
      path: config.full_path_image,
      checkPath: fs.existsSync(config.full_path_image),
      pathImage: pathImage,
      checkPathImage: fs.existsSync(pathImage),
      pathTmp: path.join(__dirname, "../../tmp")
    }

    res.status(200).send({ status: true, message: "success", payload: data });

    setTimeout(() => {
      if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
    }, 10000);
  },
}