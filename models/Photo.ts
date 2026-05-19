import mongoose, { Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  url: string;
  publicId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model<IPhoto>("Photo", PhotoSchema);
