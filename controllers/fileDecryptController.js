import { Worker, isMainThread } from "worker_threads";

export const fileDecryptController = (req, res) => {
  if (isMainThread) {
    new Promise((resolve, reject) => {
      const worker = new Worker("./workerThreads/fileDecryptThread");
      worker.on("message", (msg) => resolve(msg));
      worker.on("error", (err) => reject(err));
    });
  };
  res.end();
};