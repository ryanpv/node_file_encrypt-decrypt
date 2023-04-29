import formidable from "formidable";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileFormUploader = (req, res) => {
  if (req.method == "POST") {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.basename(dirname("/files/decryptedFiles"))
    console.log('test path', path.basename(dirname("/files/decryptedFiles/.")));

    form.on('file', (field, file) => {
      // console.log('file path: ', file.filepath);
      fs.rename(file.filepath, path.join(path.basename(dirname("/files/decryptedFiles")), file.originalFilename), (err) => {
        if (err) throw err;

        // const file_path = "/files/"+file.originalFilename
      });
    });

    form.on('error', (err) => {
      console.log('some upload error', err);
    });

    form.on('end', () => {
      console.log('upload complete');
      // res.redirect('/testPoint')
      res.end()
    });

    form.parse(req); // must call parse to actually receive the file with data
  };
};