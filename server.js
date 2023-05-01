import express from "express";
import encryptRouter from "./routes/encryptRoutes.js";
import decryptRouter from "./routes/decryptRoutes.js";
import path from "path";
import cors from "cors";

const app = express();

app.set("view engine", "ejs");

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/encrypt", encryptRouter); // encryption route
app.use("/decrypt", decryptRouter); // decryption route

app.get("/testPoint", (req, res) => {
  res.render("index.ejs");
});

app.get("/testSend", (req, res) => {
  res.download(path.resolve("./uploadedFiles/test.txt"));
});

app.listen(3001, () => {
  console.log('listening to port 3001');
});