const mongoose = require("mongoose");

const plantsSchema = new mongoose.Schema(
  {
    userPlantName: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    commonName: {
      type: String,
      required: true,
    },
    wateringFrequency: {
      type: String,
      required: true,
    },
    wateringPeriod: {
      type: String,
    },
    wateringInfo: {
      type: String,
    },
    sunlightInfo: {
      type: String,
    },
    sunlight: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timeStamps: true }
);

const commentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    interval: {
      type: String,
      required: true,
      enum: ["daily", "biweekly", "weekly", "monthly"],
    },
    timeOfDay: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening"],
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
  comments: [commentsSchema],
  plants: [plantsSchema],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
