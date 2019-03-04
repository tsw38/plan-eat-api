const { firestore } = require("../../../config/firebase.config");

const getMealPrep = async id => {
  const request = await firestore
    .collection("mealPreps")
    .doc(id)
    .get();

  const data = (await request.exists) && request.data();

  const creationDate = data && new Date(data.creationDate.toDate()).getTime();

  return {
    ...(data && {
      id,
      ...data,
      creationDate
    })
  };
};

const getMealPreps = async args => {
  const response = await firestore.collection("mealPreps").get();
  let mealPreps = [];

  for (let mealType of response.docs) {
    console.warn(mealType);

    mealPreps.push({
      id: mealType.id,
      ...mealType.data()
    });
  }

  return mealPreps;
};

module.exports = {
  getMealPrep,
  getMealPreps
};
