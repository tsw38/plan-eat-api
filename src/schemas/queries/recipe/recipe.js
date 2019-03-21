const { firestore } = require("../../../config/firebase.config");
const { unify } = require('../../../utilities/array');
const fs        = require('fs');
const path      = require('path');

const getRecipe = async args => {
    const cacheFolder = path.join(__dirname, '../../../../cache/recipes');

    try {
        let recipe = fs.readFileSync(path.join(cacheFolder, `${args.slug}.json`), 'utf-8');
        recipe = JSON.parse(recipe);
        let modificationResp;
        console.warn('this is the request', recipe);

        //TODO: store recipe modifications in storage?
        if (args.modificationId) {
            modificationResp = await firestore.collection("recipeModifications").doc(args.modificationId).get();
            modificationResp = modificationResp.data();
        }

        return {
            ...(!!recipe ? {
                ...recipe,
                ...(modificationResp || {}),
                ingredients: modificationResp ?
                    unify(recipeResp.ingredients, modificationResp.ingredients, 'id') :
                    recipe.ingredients
            } : {
                error: 'No recipe found'
            })
        }
    } catch ({message}) {
        console.warn('is there an error', message);
        if (/no.+file/.test(message)) {
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
