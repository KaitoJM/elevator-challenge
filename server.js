import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

// Serve static files from app/web
const webDir = path.join(__dirname, "web");
app.use(express.static(webDir));

app.use("/app", express.static(path.join(__dirname, "app")));

// Default route -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(webDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
