const foodModel = require("../service/foodModel");

const getAllIngredient = async (req, h) => {
  try {
    const foods = await foodModel.getAllFoods();
    return h.response(foods).code(200);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports = { getAllIngredient };