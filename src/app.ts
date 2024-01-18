import express, { Request, Response, Application } from "express";

const app: Application = express();

app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
