import path from "path";
import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import Image from "../models/image.model";

// @desc Upload image
// @route POST /api/v1/image/upload
// @access Public
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if file was uploaded
    if (!req.files) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const file = req.files.image as UploadedFile;

    // Check if file is an image
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({
        message: "Please upload an image file",
      });
    }

    const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 100000000);

    const MaxFileSizeInMB = MAX_FILE_SIZE / (1024 * 1024);

    // Check if file size is too large
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        message: `Please upload an image less than ${MaxFileSizeInMB} MB`,
      });
    }

    // Generate a unique name for the image
    const newDate = Date.now();

    const fileUploadPath = path.join(__dirname, "../../public/uploadedimages");

    // Move the image to the public/uploadedimages folder
    await file.mv(path.join(fileUploadPath, newDate + file.name));

    const port = process.env.PORT || 5000;

    const fileSizeInMB = file.size / (1024 * 1024);

    const data = {
      name: file.name.split(".")[0],
      size: `${fileSizeInMB.toFixed(2)} MB`,
      type: file.name.split(".").pop(),
      mimetype: file.mimetype,
      url: `http://127.0.0.1:${port}/uploadedimages/${newDate}${file.name}`,
    };

    // Save the image details to the database
    const image = new Image({
      name: data.name,
      size: data.size,
      type: data.type,
      mimeType: data.mimetype,
      imageUrl: data.url,
    });

    await image.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      image,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// @desc Get image
// @route GET /api/v1/image/get_image
// @access Public
export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the most recent image
    const image = await Image.find().sort({ createdAt: -1 }).limit(1);

    if (!image) {
      return res.status(404).json({
        message: "You have not uploaded any image",
      });
    }

    return res.status(200).json({
      message: "Most recent image",
      image,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
