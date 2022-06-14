import path from 'path';
import express from 'express';
import multer from 'multer';
import {cloudinary} from "../config/cloudinary.js";
import * as fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
destination(req, file, cb) {
    cb(null, 'uploads/')
},
filename(req, file, cb) {
    cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
},
});

function checkFileType(file, cb) {
const filetypes = /jpg|jpeg|png/
const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
const mimetype = filetypes.test(file.mimetype)

if (extname && mimetype) {
    return cb(null, true)
} else {
    cb('Images only!')
}
}

const upload = multer({
storage,
fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
},
});

router.post('/', upload.single('image'), (req, res) => {

if (req.file) {
    try {
        return cloudinary
            .uploader
            .upload(req.file.path)
            .then((result) => {
                fs.unlinkSync(req.file.path);
                return res.status(200).json(result?.url);
            }).catch(e => {
                return res.status(500).json({error: e});
            });
    } catch (e) {
        console.log(e);
    }
}

return res.status(400).send();
});

export default router
