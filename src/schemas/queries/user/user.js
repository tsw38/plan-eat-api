const { firestore } = require("../../../config/firebase.config");

const getUser = async id => {
	const request   = await firestore.collection("users").doc(id).get();
  const data      = await request.exists && request.data();
  const lastLogin = data && new Date(data.lastLogin.toDate()).getTime();

  const user = {
    ...(data && {
      id,
      ...data,
      lastLogin
    })
  };

  return user;
};

const getUsers = async args => {
  const response = await firestore.collection("users").get();
  let users = [];

  for (const user of response.docs) {
    users.push({
      id: user.id,
      ...user.data()
    });
  }

  return users;
};

module.exports = {
  getUser,
  getUsers
};
