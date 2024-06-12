const { firestore } = require("../config/gcp");

const foodCollection = firestore.collection("ingredients");

const getAllFoods = async () => {
  const snapshot = await foodCollection.get();
  const ingredients = [];
  snapshot.forEach((doc) => ingredients.push({ id: doc.id, ...doc.data() }));
  return ingredients;
};

module.exports = {
  getAllFoods,
};
