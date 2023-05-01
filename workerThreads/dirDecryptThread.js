import { parentPort, workerData } from "worker_threads";
import { readdir } from "fs";
import crypto from "crypto";
import { createWriteStream, createReadStream } from "fs";

const dirDecryptWorker = () => {
  readdir("./encryptedFiles", (err, files) => {
    if (err) {
      console.log(err);
      process.exit(1);
      // throw err;
    };

    files.forEach(async (file) => {
      try {
        const algorithm = "aes-256-ctr";
        const key = "rvs-file-encryptor-decryptor-app" // for dev_env, 32byte string
        const iv = "rv_initialvector" // 16 bytes
        const cipher = crypto.createDecipheriv(algorithm, key, iv);
        const streamChunks = [];
        const readableStream = createReadStream("./encryptedFiles/" + file);
        const writeableStream = createWriteStream("./decryptedFiles/" + "decr_" + file);
    
        for await (const chunk of readableStream) {
          streamChunks.push(Buffer.from(chunk));
        };
        // console.log('streamchunks', streamChunks.toString());
    
        let decryptFile = cipher.update(streamChunks.toString(), "hex", "utf-8")
        decryptFile += cipher.final("utf-8");
  
        writeableStream.write(decryptFile);
    
        // console.log(file);
      } catch (err) {
        console.log(err);
      };
    });
  });
};

dirDecryptWorker();