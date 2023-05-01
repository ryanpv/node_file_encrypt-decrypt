import { Worker, isMainThread } from "worker_threads";

export const fileDecryptController = (req, res) => {
  if (isMainThread) {
    const worker = new Worker("./workerThreads/fileDecryptThread");

    worker.on("message", (msg) => {
      console.log("msg from worker: ", msg);
    });
  };
  res.end();
};