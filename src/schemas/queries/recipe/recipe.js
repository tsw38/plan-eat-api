const { firestore } = require("../../../config/firebase.config");
const { unify } = require('../../../utilities/array');

const getRecipe = async args => {
    let recipeResp = await firestore.collection("recipes").doc(args.id).get();
    recipeResp     = recipeResp.data();

    let modificationResp;
    try {
        modificationResp = await firestore.collection("recipeModifications").doc(args.modificationId).get();
        modificationResp = modificationResp.data();
    } catch (err) {

    }


    return {
        id: args.id,
        ...recipeResp,
        ...(modificationResp || {}),
        ingredients: modificationResp ?
            unify(recipeResp.ingredients, modificationResp.ingredients, 'id') :
            recipeResp.ingredients
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
