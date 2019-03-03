const { firestore } = require("../../../config/firebase.config");

const getTag = async id => {
  const request = await firestore
    .collection("tags")
    .doc(id)
    .get();

  return {
    id,
    ...request.data()
  };
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
