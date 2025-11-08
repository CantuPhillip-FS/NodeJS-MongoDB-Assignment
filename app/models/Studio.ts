import { Schema, model } from "mongoose";

const studioSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The studio's name is required."],
      unique: [
        true,
        "A studio with this name already exists. Did you mean to update?",
      ],
      trim: true,
      maxLength: [50, "Studio's Name cannot be more than 50 characters."],
    },
    year_founded: {
      type: Number,
      required: [true, "Studio's year_founded is required."],
    },
    headquarters: {
      type: String,
      required: [
        true,
        "The headquarters location is required. E.g., 'Kajinocho, Koganei, Tokyo, Japan'",
      ],
    },
    website: {
      type: String,
      required: [true, "Studio's website is required. E.g., 'ghibli.jp'"],
      maxlength: [300, "Website cannot be more than 300 charactes"],
      match: [
        /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
  },
  { timestamps: true }
);

// ESM/TypeScript way to export the model
const StudioModel = model("Studio", studioSchema);
export default StudioModel;
