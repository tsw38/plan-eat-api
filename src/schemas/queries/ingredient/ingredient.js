const { firestore } = require("../../../config/firebase.config");

const getIngredient = async id => {
  const request = await firestore
    .collection("ingredients")
    .doc(id)
    .get();

  return {
    id,
    ...request.data()
  };
};

const getIngredients = async args => {
  const response = await firestore.collection("ingredients").get();
  let ingredientsArr = [];

  for (let ingredient of response.docs) {
    ingredientsArr.push({
      id: ingredient.id,
      ...ingredient.data()
    });
  }

  return ingredientsArr;
};

module.exports = {
  getIngredient,
  getIngredients
};
