const axios = require("axios");
const { firestore } = require("../config/gcp");

require("dotenv").config();

const getFoodRecommendation = async (req, h) => {
  try {
    const uid = req.user.uid;
    const user_doc = await firestore.collection("users").doc(uid).get();
    let { user_allergies } = user_doc.data();
    if (!user_allergies) user_allergies = "";

    const { user_preference_ingredients } = req.payload;
    const userInput = {
      allergy_ingredients: user_allergies,
      user_preference_ingredients: user_preference_ingredients,
    };

    const foodData = req.server.app.foodData;

    const response = await axios.post(process.env.ML_API_ENDPOINT, userInput);
    const recommendations = response.data;

    const recommendations_preview = recommendations.map((index) => {
      const item = foodData[index];
      return {
        index: index,
        recipe_name: item.Name,
        image_url: item.Image_url,
        cuisine: item.Cuisine,
        cook_time_in_mins: item["Cook_time (in mins)"],
      };
    });

    return h.response({
      status: "OK",
      message: "Recommendation Food Get!",
      data: recommendations_preview,
    });
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({ message: "Failed to get Recommendation", error })
      .code(500);
  }
};

const getFoodRandom = async (req, h) => {
  try {
    const foodData = req.server.app.foodData;

    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 6880));
    }

    const randomFood = randomNumbers.map((index) => {
      const item = foodData[index];
      return {
        index: index,
        recipe_name: item.Name,
        image_url: item.Image_url,
        cuisine: item.Cuisine,
        cook_time_in_mins: item["Cook_time (in mins)"],
      };
    });

    return h
      .response({
        mstatus: "OK",
        message: "Random Food Get!",
        data: randomFood,
      })
      .code(200);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const getFoodDetail = async (req, h) => {
  try {
    const { foodId } = req.params;
    const foodData = req.server.app.foodData;
    const foodDetail = foodData[foodId];

    return h.response({
      status: "OK",
      message: "Food Detail Get!",
      data: [
        {
          index: foodId,
          recipe_name: foodDetail.Name,
          image_url: foodDetail.Image_url,
          cuisine: foodDetail.Cuisine,
          cook_time_in_mins: foodDetail["Cook_time (in mins)"],
          ingredients_quantity: foodDetail.Ingredients_quantity.split("  "),
          instructions: foodDetail.Instructions.split(". "),
        },
      ],
    });
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({ message: "Failed to get detailed food", error })
      .code(500);
  }
};

const getIngredientAll = async (req, h) => {
  try {
    const ingredientData = req.server.app.ingredientData;
    console.log(ingredientData);

    return h
      .response({
        status: "OK",
        message: "Ingredients loaded",
        data: ingredientData,
      })
      .code(200);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const getIngredientRandom = async (req, h) => {
  try {
    const ingredientData = req.server.app.ingredientData;

    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 1220));
    }

    const randomIngredients = randomNumbers.map((index) => {
      const item = ingredientData[index];
      return {
        index: index,
        ingredient: item.ingredient,
        category: item.category,
      };
    });

    return h
      .response({
        mstatus: "OK",
        message: "Random Ingredient Get!",
        data: randomIngredients,
      })
      .code(200);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports = {
  getFoodRecommendation,
  getFoodDetail,
  getFoodRandom,
  getIngredientAll,
  getIngredientRandom,
};
