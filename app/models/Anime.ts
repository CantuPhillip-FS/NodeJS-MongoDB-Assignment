import { Schema, model } from "mongoose";

const animeSchema = new Schema(
  {
    title: {
      type: String,
      unique: [
        true,
        "An anime with this title already exists. Did you mean to update?",
      ],
      required: [true, "The anime's title is required."],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters."],
    },
    year_released: {
      type: Number,
      required: [true, "Anime's year_released is required. E.g., '2004'"],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1."],
      max: [10, "10 is the highest rating."],
    },
    studio: {
      type: Schema.Types.ObjectId,
      ref: "Studio",
    },
  },
  { timestamps: true }
);

const AnimeModel = model("Anime", animeSchema);
export default AnimeModel;
