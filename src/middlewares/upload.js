import multer from "multer";
import { uploadsDir } from "../utils/dir.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
      req.imagenProfile = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.')[1];
      cb(null, req.imagenProfile)
    }
  })
  
const upload = multer({ storage: storage })

export default upload;