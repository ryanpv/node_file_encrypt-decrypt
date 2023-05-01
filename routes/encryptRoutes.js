import { Worker, isMainThread } from "worker_threads";
import express from "express";
import { fileFormUploader } from "../controllers/fileFormUpload.js";
import { fileEncryptController } from "../controllers/fileEncryptController.js";


const encryptRouter = express.Router();

encryptRouter.route("/fileUpload")
  .post(fileFormUploader);

encryptRouter.route("/fileEncrypt/:fileName")
  .get(fileEncryptController);

encryptRouter.route("/encrypt-directory")
  .get((req, res) => {
    if (isMainThread) {
      const worker = new Worker("./workerThreads/dirEncryptThread.js", { workerData: "parent thread sending data" });
  
      worker.on("message", (msg) => {
        console.log("return msg from worker: ", msg);
      });
      worker.postMessage("parent thread sending test msg")
    };    
    res.end();
  });

export default encryptRouter;