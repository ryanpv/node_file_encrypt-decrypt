import express from "express";
import { fileDecryptController } from "../controllers/fileDecryptController.js";
import { dirDecryptController } from "../controllers/dirDecryptController.js";

const decryptRouter = express.Router();

decryptRouter.route("/fileDecrypt/:fileName")
  .get(fileDecryptController);

decryptRouter.route("/decrypt-directory")
  .get(dirDecryptController);

export default decryptRouter;