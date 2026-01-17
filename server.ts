import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

// Serve browser files
app.use(express.static(path.join(process.cwd(), "web")));
app.use("/web", express.static(path.join(process.cwd(), "dist/web")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "web/index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
