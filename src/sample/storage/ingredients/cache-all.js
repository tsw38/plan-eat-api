const {admin, firestore} = require('../../../config/firebase.config');
const constructDictionary= require('../../../utilities/constructDictionary');
const fs                 = require('fs');
const path               = require('path');
const storage            = new admin.storage();
const cacheFolder        = path.resolve(__dirname, '../../../../cache');
const cacheIngredients   = path.resolve(cacheFolder, 'ingredients');

const cacheAllIngredients = async () => {
    const response =  await firestore.collection("ingredients").get();

    const sortedIngredients = response.docs.reduce((sorted, ingredient) => {
        const {name, nutrition, unit} = ingredient.data();

        return {
            ...sorted,
            [name.charAt(0).toLowerCase()]: {
                ...sorted[name.charAt(0).toLowerCase()],
                [ingredient.id]: {name, nutrition, unit}
            }
        }
    }, {});

    if (!fs.existsSync(cacheFolder)) { fs.mkdirSync(cacheFolder); }
    if (!fs.existsSync(cacheIngredients)) { fs.mkdirSync(cacheIngredients); }

    constructDictionary(response.docs.map(ingredient => ({id:ingredient.id, ...ingredient.data()})))
        .then(dictionary => {
            fs.writeFileSync(path.join(cacheIngredients, 'dictionary.json'), JSON.stringify(dictionary))
    });

    Object.keys(sortedIngredients).forEach(letter => {
        const filePath = path.join(cacheIngredients, `${letter}.json`);

        try {
            fs.writeFileSync(filePath, JSON.stringify(sortedIngredients[letter]));
        } catch (err) {
            console.warn('Error trying to cache ingredients', err);
        }
    })

    return;
}

cacheAllIngredients();