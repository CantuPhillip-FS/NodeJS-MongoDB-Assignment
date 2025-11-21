import { Schema, model } from "mongoose";

const studioSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The studio's name is required."],
      unique: [true, "A studio with this name already exists."],
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
      required: [true, "A website is required. E.g., 'ghibli.jp'"],
      maxlength: [300, "Website cannot be more than 300 charactes"],
    },
    isActive: {
      type: Boolean,
      required: [
        true,
        "isActive true or false is required, whether the Studio is still actively producing animes.",
      ],
    },
    animes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Anime",
      },
    ],
  },
  { timestamps: true }
);

// ESM/TypeScript way to export the model
const StudioModel = model("Studio", studioSchema);
export default StudioModel;
