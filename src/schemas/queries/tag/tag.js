const { firestore } = require("../../../config/firebase.config");
const fs            = require('fs');
const path          = require('path');

const getTag = async id => {
    const cacheFolder = path.join(__dirname, '../../../../cache/tags');

    let dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');
        dictionary = JSON.parse(dictionary);

    let tags = fs.readFileSync(path.join(cacheFolder, `${dictionary[id]}.json`), 'utf-8');
        tags = JSON.parse(tags);
    const tag = tags[id];

    //TODO: GET category and allergies for ingredient
    return {
        ...(!!tag ? {
            id,
            ...tag
        } : {
            error: 'No tag found'
        })
    }
};

const getTags = async ({isGrocerSection, ...args}) => {
    const cacheFolder = path.join(__dirname, '../../../../cache/tags');

    let dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');
        dictionary = JSON.parse(dictionary);

    const tagFileList = Object.keys(dictionary).reduce((allFiles, tagId) => {
        return [
            ...Array.from(new Set(allFiles)),
            `${dictionary[tagId]}.json`
        ]
    }, []);

    // console.warn('fileNames list\n', tagFileList, '\n\n');

    let allTags = tagFileList.reduce((allTags, fileName) => {
        let content = fs.readFileSync(path.join(cacheFolder, fileName), 'utf-8');
            content = JSON.parse(content);

        const converted = Object.keys(content).map(key => {
            return {
                ...content[key],
                id: key
            }
        })

        return [
            ...allTags,
            ...converted.filter(elem => !allTags.some(tag => tag.id === elem.id))
        ]
    }, []);

    // THIS IS WHERE THE ARGS FROM GRAPHQL QUERY COMES IN
    if (isGrocerSection === true) {
        allTags = allTags.filter(tag => !!tag.isGrocerSection);
    }

    if (isGrocerSection === false) {
        allTags = allTags.filter(tag => !tag.isGrocerSection);
    }

    return allTags;
};

module.exports = {
  getTag,
  getTags
};
