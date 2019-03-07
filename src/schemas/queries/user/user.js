const { firestore, admin } = require("../../../config/firebase.config");
const uuid 		      = require('uuid/v4');

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

//server side validation needs to happen at this point
const addUser = async userObj => {
    // validate user
    // VALID: continue
    // INVALID: return error code
    const userUUID = uuid();

    var insertedUser = await firestore.collection('users').doc(userUUID).set(userObj);

    admin.auth().createUser({
        email: "tyler.scott.14@gmail.com",
        emailVerified: false,
        phoneNumber: "+16078820531",
        password: "secretPassword",
        displayName: "Tyler Williams",
        disabled: false
    }).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
        console.log("Error creating new user:", error);
    });

  return {
    name: {
      first: userObj.firstName,
      last: userObj.lastName
    },
    email: userObj.email,
    id: userUUID
  }
}

const updateUser = async userObj => {}

const deleteUser = async userID => {}

module.exports = {
  getUser,
  getUsers,
  addUser,
//   updateUser,
//   deleteUser
};
