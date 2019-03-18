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
    console.warn('hello world', ingredient);
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
    //TODO: update cache with this ingredient
    return {
        id: ingredientUUID
    }
}

const getIngredients = async args => {
    const cacheFolder = path.join(__dirname, '../../../../cache/ingredients');

    let dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');
        dictionary = JSON.parse(dictionary);

    const ingredientList = Object.keys(dictionary).reduce((allFiles, ingredientId) => {
        return [
            ...Array.from(new Set(allFiles)),
            `${dictionary[ingredientId]}.json`
        ]
    }, []);

    let allIngredients;

    try {
        allIngredients  = ingredientList.reduce((tags, fileName) => {
            let content = fs.readFileSync(path.join(cacheFolder, fileName), 'utf-8');
                content = JSON.parse(content);

            const converted = Object.keys(content).map(key => {
                return {
                    ...content[key],
                    id: key
                }
            })
            console.warn(converted);
            return [
                ...tags,
                ...converted.filter(elem => !tags.some(tag => tag.id === elem.id))
            ]
        }, []);
    } catch (err) {
        console.warn('these was an error');
    }

    console.warn(allIngredients);

    // // THIS IS WHERE THE ARGS FROM GRAPHQL QUERY COMES IN
    // if (isGrocerSection === true) {
    //     allTags = allTags.filter(tag => !!tag.isGrocerSection);
    // }

    // if (isGrocerSection === false) {
    //     allTags = allTags.filter(tag => !tag.isGrocerSection);
    // }

    return allIngredients;
};

//TODO: Update Ingredient & Update Cache
const updateIngredient = async ({id, updated}) => {

}

//TODO: Delete Ingredient & Update Cache
const deleteIngredient = async (ingredientId) => {

}

module.exports = {
  getIngredient,
  addIngredient,
  getIngredients
};
