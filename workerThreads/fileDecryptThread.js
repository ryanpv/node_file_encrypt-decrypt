import crypto from "crypto";
import { createReadStream, createWriteStream } from "fs";
import { dirname, basename } from "path";

const fileDecryptor = async (req, res) => {
  try {
    const algorithm = "aes-256-ctr";
    const key = "rvs-file-encryptor-decryptor-app";
    const iv = "rv_initialvector";
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    const streamChunks = [];
    const readableStream = createReadStream(`${ basename(dirname("/encryptedFiles/.")) }/${ req.params.fileName }`);
    const writeableStream = createWriteStream(`${ basename(dirname("/uploadedFiles/.")) }/unenc_${ req.params.fileName }`);
  
    for await (const chunk of readableStream) {
      streamChunks.push(chunk);
    };
  
    console.log('stream chunks', streamChunks);
    let decryptFile = cipher.update(streamChunks.toString(), "hex", "utf-8");
    decryptFile += cipher.final("utf-8");
  
    writeableStream.write(decryptFile);

  } catch (err) {
    console.log(err);
  }
};

fileDecryptor();