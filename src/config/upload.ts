import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpDir,

    storage: multer.diskStorage({
        // __dirname: the whole path until this folder is
        // '..' return one folder
        // '..' return another folder
        // 'tmp' folder to store files
        destination: tmpDir,
        filename(request, filename, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${filename.originalname}`;

            return callback(null, fileName);
        },
    }),
};
