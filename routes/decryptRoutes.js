import express from "express";
import { fileDecryptor } from "../controllers/fileDecrypt.js";

const decryptRouter = express.Router();

decryptRouter.route("/fileDecrypt/:fileName")
  .get(fileDecryptor);

export default decryptRouter;