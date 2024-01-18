import express, { Request, Response, Application } from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import connectDB from "./config/dbConfig";
import imageRoutes from "./routes/image.route";

dotenv.config();

connectDB();

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use(fileupload());

app.use(logger("dev"));

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/v1/image", imageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Akpofure's Image Processing API");
});
