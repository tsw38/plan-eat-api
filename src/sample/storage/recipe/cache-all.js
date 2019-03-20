const fs                 = require('fs');
const path               = require('path');
const {firestore} = require('../../../config/firebase.config');
const constructDictionary= require('../../../utilities/constructDictionary');

const cacheFolder        = path.resolve(__dirname, '../../../../cache');
const cacheRecipes       = path.resolve(cacheFolder, 'recipes');

const cacheAllRecipes = async () => {
    const response =  await firestore.collection("recipes").get();

    if (!fs.existsSync(cacheFolder)) { fs.mkdirSync(cacheFolder); }
    if (!fs.existsSync(cacheRecipes)) { fs.mkdirSync(cacheRecipes); }

    response.docs.forEach(recipe => {
        const json = recipe.data();
        fs.writeFileSync(path.join(cacheRecipes, `${json.slug}.json`), JSON.stringify({
            ...json,
            id: recipe.id
        }))
    });

    console.warn('cache updated');



    // constructDictionary(response.docs.map(ingredient => ({id:ingredient.id, ...ingredient.data()})))
    //     .then(dictionary => {
    //
    // });

    // Object.keys(sortedIngredients).forEach(letter => {
    //     const filePath = path.join(cacheRecipes, `${letter}.json`);

    //     try {
    //         fs.writeFileSync(filePath, JSON.stringify(sortedIngredients[letter]));
    //     } catch (err) {
    //         console.warn('Error trying to cache ingredients', err);
    //     }
    // })

    // return;
}

cacheAllRecipes();