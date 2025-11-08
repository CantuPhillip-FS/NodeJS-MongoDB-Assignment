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
      required: [
        true,
        "A website is required, e.g., 'ghibli.jp' OR 'wikipedia.org/wiki/Studio_Ghibli'",
      ],
      maxlength: [300, "Website cannot be more than 300 charactes"],
    },
    isActive: {
      type: Boolean,
      required: [
        true,
        "isActive true or false is required, whether the Studio is still actively producing animes.",
      ],
    },
  },
  { timestamps: true }
);

// ESM/TypeScript way to export the model
const StudioModel = model("Studio", studioSchema);
export default StudioModel;
