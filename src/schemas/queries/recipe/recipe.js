const { firestore } = require("../../../config/firebase.config");
const { unify } = require('../../../utilities/array');

const getRecipe = async args => {
    //TODO: get cached recpe as well
    console.warn('these are the args I\'m getting', args);
    const query = firestore.collection("recipes").where('slug', '==', args.slug).limit(1);
    const snapshot = await query.get();
    let modificationResp;


    try {
        //TODO: update this to be cached as well..but use data storage
        if (args.modificationId) {
            modificationResp = await firestore.collection("recipeModifications").doc(args.modificationId).get();
            modificationResp = modificationResp.data();
        }

        return {
            ...snapshot.docs[0].data(),
            ...(modificationResp || {}),
            ingredients: modificationResp ?
                unify(recipeResp.ingredients, modificationResp.ingredients, 'id') :
                snapshot.docs[0].data().ingredients
        }
    } catch ({message}) {
        if (/data/.test(message)) {
            return {
                error: 400
            }
        }
        return {
            error: message
        }
    }
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
