import { Worker, isMainThread } from "worker_threads";

export const fileEncryptController = (req, res) => {
  if (isMainThread) {
    new Promise((resolve, reject) => {
      const worker = new Worker("./workerThreads/fileEncryptThread.js", { workerData: req.params.fileName })
      worker.on("message", (msg) => {
        console.log(msg);
        resolve(msg)
      }); 
      worker.on("error", (err) => reject(err));
      worker.on("exit", (code) => {
        console.log(code);
        if (code !== 0) {
          reject(new Error(400));
        } 
      });
      
      worker.postMessage('Message from parent thread');
    });
  };

  res.end();
};