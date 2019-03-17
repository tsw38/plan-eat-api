const {admin, firestore} = require('../../../config/firebase.config');
const constructDictionary= require('../../../utilities/constructDictionary');
const fs                 = require('fs');
const path               = require('path');
const cacheFolder        = path.resolve(__dirname, '../../../../cache');
const cacheTags   = path.resolve(cacheFolder, 'tags');

const cacheAllTags = async () => {
    const response =  await firestore.collection("tags").get();

    const sortedTags = response.docs.reduce((sorted, tag) => {
        const {name} = tag.data();

        return {
            ...sorted,
            [name.charAt(0).toLowerCase()]: {
                ...sorted[name.charAt(0).toLowerCase()],
                [tag.id]: {name}
            }
        }
    }, {});

    console.warn(sortedTags);

    if (!fs.existsSync(cacheFolder)) { fs.mkdirSync(cacheFolder); }
    if (!fs.existsSync(cacheTags)) { fs.mkdirSync(cacheTags); }

    constructDictionary(response.docs.map(tag => ({id:tag.id, ...tag.data()})))
        .then(dictionary => {
            fs.writeFileSync(path.join(cacheTags, 'dictionary.json'), JSON.stringify(dictionary))
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