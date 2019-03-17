const { firestore } = require("../../../config/firebase.config");
const uuid          = require('uuid/v4');
const fs            = require('fs');
const path          = require('path');

const getIngredient = async id => {
    const cacheFolder = path.join(__dirname, '../../../../cache/ingredients');

    let dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');
        dictionary = JSON.parse(dictionary);

    let ingredients = fs.readFileSync(path.join(cacheFolder, `${dictionary[id]}.json`), 'utf-8');
        ingredients = JSON.parse(ingredients);

    const ingredient = ingredients[id];

    //TODO: GET category and allergies for ingredient
    return {
        ...(!!ingredient ? {
            id,
            ...ingredient
        } : {
            error: 'No ingredient found'
        })
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
