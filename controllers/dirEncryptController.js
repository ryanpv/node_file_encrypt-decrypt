import { Worker, isMainThread } from "worker_threads";

export const dirEncryptController = (req, res) => {
  if (isMainThread) {
    new Promise((resolve, reject) => {
      const worker = new Worker("./workerThreads/dirEncryptThread.js", { workerData: "parent thread sending data" });
  
      worker.on("message", resolve);
      worker.on("error", reject)
      worker.postMessage("dirEnc Parent thread saying hi");
    });
  };
  res.end();
};