import express from "express";

const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
