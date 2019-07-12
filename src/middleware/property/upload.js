import { results, ERROR } from '../../helper/result';
import cloudinary from '../../startup/cloudinary';

export default (req, res, next) => {
    if(req.files) {
        const file = req.files.image_url;
        cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
            if (err) res.status(500).send(results(500, ERROR, err));
            
            req.body.image_url = result.secure_url;
            next();
        });
    }
    else {
        next();
    }
}