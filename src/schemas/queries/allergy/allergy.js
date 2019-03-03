const { firestore } = require("../../../config/firebase.config");

const getAllergy = async id => {
  const request = await firestore
    .collection("allergies")
    .doc(id)
    .get();

  return {
    id,
    ...request.data()
  };
};

const getAllergies = async args => {
  const response = await firestore.collection("allergies").get();
  let allergiesArr = [];

  for (let allergy of response.docs) {
    allergiesArr.push({
      id: allergy.id,
      ...allergy.data()
    });
  }

  return allergiesArr;
};

module.exports = {
  getAllergy,
  getAllergies
};
