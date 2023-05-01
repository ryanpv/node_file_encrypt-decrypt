import { Worker, isMainThread } from "worker_threads";

export const dirEncryptController = (req, res) => {
  if (isMainThread) {
    const worker = new Worker("./workerThreads/dirEncryptThread.js", { workerData: "parent thread sending data" });

    worker.on("message", (msg) => {
      console.log("Response msg from worker: ", msg);
    });
    worker.postMessage("dirEnc Parent thread saying hi");
  };
  res.end();
};