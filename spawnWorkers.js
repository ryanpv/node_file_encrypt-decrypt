import { Worker, isMainThread, workerData } from "worker_threads";
import { dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const threadSpawner1 = (req, res, next) => {
  console.log(basename(dirname("/controllers")));
  if (isMainThread) {
    // const worker = new Worker("../controllers/fileEncrypt.js");
    const worker = new Worker("./controllers/fileEncrypt.js", { workerData: req.params.fileName })
    worker.on("message", (msg) => console.log(msg));
    worker.on("error", (err) => { throw err });
    worker.on("exit", (code) => {
      console.log(code);
      if (code !== 0) {
        throw new Error(400);
      };
    });
    worker.postMessage("parent thread says hi")
  }
  next()
};