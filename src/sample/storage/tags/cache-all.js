const {admin, firestore} = require('../../../config/firebase.config');
const constructDictionary= require('../../../utilities/constructDictionary');
const constructGrocerySectionList= require('../../../utilities/constructGrocerySectionList');
const fs                 = require('fs');
const path               = require('path');
const cacheFolder        = path.resolve(__dirname, '../../../../cache');
const cacheTags   = path.resolve(cacheFolder, 'tags');

const cacheAllTags = async () => {
    const response =  await firestore.collection("tags").get();

    const sortedTags = response.docs.reduce((sorted, tag) => {
        const tagInfo = tag.data();

        return {
            ...sorted,
            [tagInfo.name.charAt(0).toLowerCase()]: {
                ...sorted[tagInfo.name.charAt(0).toLowerCase()],
                [tag.id]: tagInfo
            }
        }
    }, {});

    // console.warn(sortedTags);

    if (!fs.existsSync(cacheFolder)) { fs.mkdirSync(cacheFolder); }
    if (!fs.existsSync(cacheTags)) { fs.mkdirSync(cacheTags); }

    constructDictionary(response.docs.map(tag => ({id:tag.id, ...tag.data()})))
        .then(dictionary => {
            fs.writeFileSync(path.join(cacheTags, 'dictionary.json'), JSON.stringify(dictionary))
    });

    constructGrocerySectionList(sortedTags)
        .then(dictionary => {
            fs.writeFileSync(path.join(cacheTags, 'grocerySection.json'), JSON.stringify(dictionary))
    });

    Object.keys(sortedTags).forEach(letter => {
        const filePath = path.join(cacheTags, `${letter}.json`);

        try {
            fs.writeFileSync(filePath, JSON.stringify(sortedTags[letter]));
        } catch (err) {
            console.warn('Error trying to cache tags', err);
        }
    })

    return;
}

cacheAllTags();