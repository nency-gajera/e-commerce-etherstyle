import multer from 'multer';
import fs from 'fs';

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        callback(null, Date.now() + '-' + cleanName);
    }
});

const upload = multer({ storage });

export default upload;
