import { Worker } from "worker_threads";

export const fileEncryptController = (req, res) => {
  const worker = new Worker("./workerThreads/fileEncryptThread.js", { workerData: req.params.fileName })
  worker.on("message", (msg) => console.log("worker msg: ", msg));
  worker.on("error", (err) => { throw err });
  worker.on("exit", (code) => {
    console.log(code);
    if (code !== 0) {
      throw new Error(400);
    } 
  });
  worker.postMessage('parent thread says hi');
  res.end();
};