const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require('node:path');

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        const folderPath = 'house-booking';
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;

        return {
            folder: folderPath,
            public_id: publicId,
            format: fileExtension,
            resource_type: "auto",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
        };
    }
});

const upload = multer({storage});

module.exports = upload;