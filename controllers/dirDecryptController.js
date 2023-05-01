import { Worker, isMainThread } from "worker_threads";

export const dirDecryptController = (req, res) => {
  if (isMainThread) {
    const worker = new Worker("./workerThreads/dirDecryptThread.js");
    
    worker.on("message", (msg) => console.log("message from dirDecrypt worker: ", msg));
    worker.postMessage("parent thread dirDecryptController says hi");
  };
  res.end();
};