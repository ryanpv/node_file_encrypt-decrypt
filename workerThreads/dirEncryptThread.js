import { parentPort, workerData } from "worker_threads";
import { readdir } from "fs";
import crypto from "crypto";
import { createReadStream, createWriteStream } from "fs";

const loopDir = () => { 
  readdir("./uploadedFiles", (err, files) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    console.time("dir loop")
    files.forEach(async (file) => {
      try {
        // console.log("loop started");
        // const algorithm = "aes-256-ctr";
        // const key = crypto.randomBytes(32);
        // const iv = crypto.randomBytes(16);
        const algorithm = "aes-256-ctr";
        const key = "rvs-file-encryptor-decryptor-app" // for dev_env, 32byte string
        const iv = "rv_initialvector" // 16 bytes
        const cipher = crypto.createCipheriv(algorithm, key, iv); // new cipher for each iteration
        const chunks = [];
        // console.log("file name: ", file)
        const readableStream = createReadStream("./uploadedFiles/" + file);
        // const readableStream = createReadStream(`${ basename(dirname("/files/deryptedFiles")) }/${ file }`)
        const writeableStream = createWriteStream("./encryptedFiles/" + "enc_" + file);
        // const writeableStream = createWriteStream(`${ basename(dirname("/encryptedFiles/.")) }/enc_${ file }`)
        
        for await (const chunk of readableStream) {
          chunks.push(Buffer.from(chunk));
        };
        // console.log(chunks.toString());
        let encryptFiles = cipher.update(chunks.toString(), "utf-8", "hex")
        encryptFiles += cipher.final("hex");
        
        writeableStream.write(encryptFiles);

      } catch (err) {
        console.log(err);
      };
    });
    console.timeEnd("dir loop")
  });
};
// const receivedData = workerData;
parentPort.on("message", (msg) => { console.log("parent thread MESSAGE: ", msg) });
parentPort.postMessage(`parent thread DATA received: '${ workerData }`);

loopDir();