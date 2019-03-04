const { firestore } = require("../../../config/firebase.config");

const getMealType = async id => {
  const request = await firestore
    .collection("mealTypes")
    .doc(id)
	.get();

  return {
    id,
    ...request.data()
  };
};

const getMealTypes = async args => {
  const response = await firestore.collection("mealTypes").get();
  let mealTypes = [];

  for (let mealType of response.docs) {
    console.warn(mealType);

    mealTypes.push({
      id: mealType.id,
      ...mealType.data()
    });
  }

  return mealTypes;
};

module.exports = {
	getMealType,
	getMealTypes
};
