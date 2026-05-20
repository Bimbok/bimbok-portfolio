import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  url: string;
  publicId: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
