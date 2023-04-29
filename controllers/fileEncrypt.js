import crypto from "crypto";
import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileEncryptor = async (req, res) => {
  const algorithm = "aes-256-ctr";
  const key = "rvs-file-encryptor-decryptor-app" // must be 32 bytes for createCipheriv()
  const iv = "rv_initialvector"
  // const iv = crypto.randomBytes(16);
  // const base64Iv = iv.toString("base64") // to store iv more easily - needed to initialize decipher
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const readableStream = createReadStream(`${ path.basename(dirname("/files/decryptedFiles")) }/${ req.params.fileName }`);
  const writeableStream = createWriteStream(`${ path.basename(dirname("/encryptedFiles/.")) }/enc_${ req.params.fileName }`);
  const streamChunks = []
  
  for await (const chunk of readableStream) {
    // streamChunks.push(Buffer.from(chunk))
    streamChunks.push(chunk)
  };
  // console.log('stream chunks: ',streamChunks);

  let encryptFile = cipher.update(streamChunks.toString(), "utf-8", "hex")
  encryptFile += cipher.final("hex")

  writeableStream.write(encryptFile)
 
  // readableStream.pipe(writeableStream)
  

  res.end()
}
