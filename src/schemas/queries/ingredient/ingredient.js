const { firestore } = require("../../../config/firebase.config");

const getIngredient = async id => {
    try {
        const request = await firestore
            .collection("ingredients")
            .doc(id)
            .get();
        const snapshot = request.data();

        return {
            id,
            ...snapshot,
        };
    } catch ({message}) {
        return {
            error: message
        }
    }
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
