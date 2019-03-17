const { firestore } = require("../../../config/firebase.config");
const fs            = require('fs');
const path          = require('path');

const getTag = async id => {
    const cacheFolder = path.join(__dirname, '../../../../cache/tags');

    let dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');
        dictionary = JSON.parse(dictionary);

        console.warn(dictionary)

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

const getTags = async args => {
  const response = await firestore.collection("tags").get();
  let tagsArr = [];

  for (let tag of response.docs) {
    tagsArr.push({
      id: tag.id,
      ...tag.data()
    });
  }

  return tagsArr;
};

module.exports = {
  getTag,
  getTags
};
