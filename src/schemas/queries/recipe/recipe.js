const { firestore } = require("../../../config/firebase.config");

const getRecipe = async id => {
  const request = await firestore
    .collection("recipes")
    .doc(id)
	.get();

	console.warn('what is happening');

  return {
    id,
    ...request.data()
  };
};

const getRecipes = async args => {
  const response = await firestore.collection("recipes").get();
  let recipesArr = [];

  for (let recipe of response.docs) {
    recipesArr.push({
      id: recipe.id,
      ...recipe.data()
    });
  }

  return recipesArr;
};

module.exports = {
  getRecipe,
  getRecipes
};
