const User = require("../models/user");
const plantService = require("../services/plantService");

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.plants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plant = user.plants.id(req.params.plantId);
    res.status(200).json(plant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plantData = await plantService.getPlant(req.body.plantId);
    const plant = {
      userPlantName: req.body.userPlantName,
      commonName: plantData.common_name,
      scientificName: plantData.scientific_name[0],
      wateringFrequency: plantData.watering,
      sunlight: plantData.sunlight[0],
      description: plantData.description,
      image: plantData.default_image.regular_url,
    };
    user.plants.push(plant);
    await user.save();
    res.status(201).json(plant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, create, show };
