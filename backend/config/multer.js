const multer = require("multer")

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public")
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
})

let public = multer({storage});

module.exports = public