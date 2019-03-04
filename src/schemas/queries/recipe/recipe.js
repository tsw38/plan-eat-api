const { firestore } = require("../../../config/firebase.config");
const { unify } = require('../../../utilities/array');

const getRecipe = async args => {
  const recipeResp = await firestore.collection("recipes").doc(args.id).get();
  let modificationResp;

  if (args.modificationId) {
    modificationResp = await firestore.collection("recipeModifications").doc(args.modificationId).get();
  }

  const originalData = recipeResp.data();
  const modificationData = modificationResp.data();

  return {
    id: args.id,
    ...originalData,
    ...modificationResp,
    ingredients: unify(originalData.ingredients, modificationData.ingredients, 'id')
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
