import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  name: string;
  size: string;
  type: string;
  mimeType: string;
  imageUrl: string;
}

const ImageSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, "File Name is Required"] },
    size: { type: String, required: [true, "File Size is Required"] },
    type: { type: String, required: [true, "File Type is Required"] },
    mimeType: { type: String, required: [true, "File Mimetype is Required"] },
    imageUrl: { type: String, required: [true, "File ImageUrl is Required"] },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model<IImage>("Image", ImageSchema);

export default Image;
