import { Worker, isMainThread } from "worker_threads";

export const dirDecryptController = (req, res) => {
  if (isMainThread) {
    new Promise((resolve, reject) => {
      const worker = new Worker("./workerThreads/dirDecryptThread.js");
      
      worker.on("message", (msg) => {
        console.log(msg);
        resolve(msg) 
      });
      worker.on("error", reject);

      worker.postMessage("parent thread dirDecryptController says hi");
    });
  };
  res.end();
};