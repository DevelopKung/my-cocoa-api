const CYCLIC_BUCKET_NAME = process.env.CYCLIC_BUCKET_NAME;
// const fs = require('@cyclic.sh/s3fs')(CYCLIC_BUCKET_NAME)
const fs = require('fs')
const config = require('./../config/path-image')
const pathProducts = config.full_path_image+'/products'
const pathTopping = config.full_path_image+'/topping'
const path = require('path')
const { promisify } = require('util')
const readDir = promisify(fs.readdir)
// const readFile = promisify(fs.readFile)
let tmp = path.join(__dirname, "../../tmp")
let tmp_products = path.join(__dirname, "../../tmp/products")
module.exports = {

  create: async(req, res) => {
    
    let file = req.file
    let form = req.body
    try {
      if (!fs.existsSync(tmp)) {
        fs.mkdirSync(tmp, { recursive: true });
      }
      let path = await readDir(tmp)

      if (!fs.existsSync(tmp_products)) {
        fs.mkdirSync(tmp_products, { recursive: true });
      }
      let pathProduct = await readDir(tmp_products)

      res.status(200).send({path,pathProduct,file,form})
      return
    } catch (error) {
      let path = await readDir(tmp)
      res.status(200).send({ path, file, form, message: error.message })
    }
    
    // if (!fs.existsSync(config.full_path_image)) {
    //   fs.mkdirSync(config.full_path_image, { recursive: true });
    // }

    // if (!fs.existsSync(pathProducts)) {
    //   fs.mkdirSync(pathProducts, { recursive: true });
    // }

    // if (!fs.existsSync(pathTopping)) {
    //   fs.mkdirSync(pathTopping, { recursive: true });
    // }
    
    // let newFileName = `${file.originalname.split('.')[0]}-${Date.now()}`
    // let fileName = file.originalname.split('.')[0]
    // let fileExt = file.originalname.split('.')[1]
    // let newPath = `${pathProducts}/${newFileName}.${fileExt}`
    // let buffer = file.buffer
    // await fs.writeFile(newPath, buffer, async(err) => { if (err) return err; })

    // let data = {
    //   name: fileName,
    //   newName: newFileName,
    //   ext: fileExt,
    //   newPath: config.url_full_path_image + '/products/' + newFileName + '.' + fileExt,
    //   path: config.full_path_image,
    //   checkPath: fs.existsSync(config.full_path_image),
    //   pathProducts: pathProducts,
    //   checkPathImage: fs.existsSync(pathProducts),
    //   pathTmp: path.join(__dirname, "../../"),
    //   pathVar: await readDir(DirFile)
    // }

    // res.status(200).send({ status: true, message: "success", payload: data });

    // setTimeout(() => {
    //   if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
    //   if (fs.existsSync(pathProducts)) fs.rmSync(`${pathProducts}`, { recursive: true });
    //   if (fs.existsSync(pathTopping)) fs.rmSync(`${pathTopping}`, { recursive: true });
    // }, 10000);
  },
}