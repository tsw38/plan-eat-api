const { firestore } = require("../../../config/firebase.config");
const uuid          = require('uuid/v4');

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

const addIngredient = async (ingredient) => {
    const ingredientUUID = uuid();
    var docRef = await firestore.collection('ingredients').doc(ingredientUUID).set(ingredient);

    console.warn('this insertedingredient', docRef.id, '\n', docRef)
    return {
        id: ingredientUUID
    }
}

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
  addIngredient,
  getIngredients
};
