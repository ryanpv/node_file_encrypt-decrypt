import { parentPort, workerData } from "worker_threads";
import crypto from "crypto";
import { createReadStream, createWriteStream } from "fs";
import path, { dirname } from "path";

const fileEncryptWorker = async () => {
  try {
    console.time('file encrypt')
    const algorithm = "aes-256-ctr";
    // const key = "rvs-file-encryptor-decryptor-app" // must be 32 bytes for createCipheriv()
    const key = crypto.randomBytes(32);
    // const iv = "rv_initialvector" // 16 bytes
    const iv = crypto.randomBytes(16);
    // const base64Iv = iv.toString("base64") // to store iv more easily - needed to initialize decipher
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    const readableStream = createReadStream(`${ path.basename(dirname("../uploadedFiles/decryptedFiles")) }/${ workerData }`);
    // const readableStream = createReadStream("../uploadedFiles/pokejson.txt");
    const writeableStream = createWriteStream(`${ path.basename(dirname("../encryptedFiles/.")) }/enc15_${ workerData }`);
    // const writeableStream = createWriteStream(`${ path.basename(dirname("../encryptedFiles")) }/enc15_pokejson.txt`);
    const streamChunks = [];
  
    for await (const chunk of readableStream) {
      // streamChunks.push(Buffer.from(chunk))
      streamChunks.push(chunk); // chunk is already buffer form
    };
    
    let encryptFile = cipher.update(streamChunks.toString(), "utf-8", "hex");
    encryptFile += cipher.final("hex");
    
    writeableStream.write(encryptFile);

    console.timeEnd('file encrypt')
    // parentPort.postMessage("Msg from worker thread.");
  } catch (err) {
    console.log(err);
  };
};

// parentPort.on("message", (msg) => console.log("parent thread: ", msg));

  fileEncryptWorker();
