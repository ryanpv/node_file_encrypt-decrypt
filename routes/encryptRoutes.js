import express from "express";
import { fileEncryptor } from "../controllers/fileEncrypt.js";
import { fileFormUploader } from "../controllers/fileFormUpload.js";

const encryptRouter = express.Router();

encryptRouter.route("/fileUpload")
  .post(fileFormUploader);

encryptRouter.route("/fileEncrypt/:fileName")
  .get(fileEncryptor);


export default encryptRouter;