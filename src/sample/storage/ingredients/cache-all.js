const {admin, firestore} = require('../../../config/firebase.config');
const fs                 = require('fs');
const path               = require('path');
const storage            = new admin.storage();

const cacheAllIngredients = async () => {
    const response =  await firestore.collection("ingredients").get();

    const sortedIngredients = response.docs.map(ingredient => ({
        id: ingredient.id,
        ...ingredient.data()
    })).reduce((sorted, {id, name, nutrition, unit}, index) => ({
        ...sorted,
        [name.charAt(0).toLowerCase()]: {
            ...sorted[name.charAt(0).toLowerCase()],
            [id]: {name, nutrition, unit}
        }
    }), {});

    Object.keys(sortedIngredients).forEach(letter => {
        const filePath = path.join(__dirname, `tmp/${letter}.json`);

        fs.writeFile(filePath, JSON.stringify(sortedIngredients[letter]), { flag: 'w' }, (err) => {
            if (err) {
                return console.error(err);
            }

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    return console.error(err);
                }
                console.log(`${filePath} was successfully written`);
                storage.bucket().upload(filePath, {
                    destination: `ingredients/${letter}.json`
                }) // upload the file to data storage
            });
        });
    })

    return;
}

cacheAllIngredients();