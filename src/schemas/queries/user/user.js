const { firestore, admin, client } = require("../../../config/firebase.config");
const uuid 		      = require('uuid/v4');

const getUser = async id => {
	const request   = await firestore.collection("users").doc(id).get();
  const data      = await request.exists && request.data();
  const lastLogin = data && data.lastLogin ? new Date(data.lastLogin.toDate()).getTime() : 0;

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

const signIn = async (email, password, serverResponse) => {
    try {
        const {user} = await client.auth().signInWithEmailAndPassword(email, password);
        serverResponse.cookie("uid", user.uid, {
            httpOnly: true,
            secure: false, //change to true if you are using https
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        const idToken = user.getIdToken();
        const refreshToken = await admin.auth().createCustomToken(user.uid);
        console.warn(idToken);

        return {
            uid: user.uid,
            emailVerified: user.emailVerified,
            refreshToken,
            permissions: '111',
            error: ''
        }
    } catch ({message}) {
        console.warn('this is the message', message);
        return {
            "uid": null,
            "emailVerified": null,
            "refreshToken": null,
            "permissions": null,
            error: message
        }
    } finally {

    }



    // console.warn('signin success', user.uid, user.emailVerified);
    return "HELLO WORLD";
}

const signOut = async (uid) => {
    return 'TODO: Sign user out';
}


//server side validation needs to happen at this point
const addUser = async userObj => {
    // validate user
    // VALID: continue
    // INVALID: return error code
    const userUUID = uuid();

    const finalUser = {
        ...userObj,
        name: {
            first: userObj.firstName,
            last: userObj.lastName
        }
    }

    delete finalUser.firstName;
    delete finalUser.lastName;

    var insertedUser = await firestore.collection('users').doc(userUUID).set(finalUser);

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
  signIn,
//   updateUser,
//   deleteUser
};
