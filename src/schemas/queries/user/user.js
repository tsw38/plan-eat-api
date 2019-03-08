const { firestore, admin, client } = require("../../../config/firebase.config");
const uuid 		                   = require('uuid/v4');
const chalk                        = require('chalk');

const signIn = async ({email, password, req,res}) => {
    const userId = req.cookies.planeatuid; //this is coming from a hidden cookie from the request
    console.warn('awdawdawdawdawdaw', userId);
    if (!userId) { // the request doesnt have the cookie
        try {
            const {user} = await client.auth().signInWithEmailAndPassword(email, password);

            console.log(chalk.green(`got the user id: ${user.uid}`));
            res.cookie("planeatuid", user.uid, {
                httpOnly: false,
                secure: false, //change to true if you are using https
                maxAge: 1000 * 60 * 60 * 24 * 7 //one week cookie age
            })

            return {
                uid: user.uid,
                emailVerified: user.emailVerified,
                permissions: '111',
                error: ''
            }
        } catch ({message}) {
            console.warn('this is the message', message);
            return {
                uid: null,
                emailVerified: null,
                refreshToken: null,
                permissions: null,
                error: message
            }
        }
    }

    try {
        const userRecord = await admin.auth().getUser(userId);
        console.warn('this is the user record', userRecord);

        return {
            uid: userRecord.uid,
            emailVerified: userRecord.emailVerified,
            permissions: '111',
            error: ''
        }
    } catch ({message}) {
        console.log(chalk.red('userId existed but something went wrong'), userId);
        res.clearCookie("planeatuid")
        return {
            "uid": null,
            "emailVerified": null,
            "refreshToken": null,
            "permissions": null,
            "error": message
        }
    }
}

const signOut = async ({req,res}) => {
    const userId = req.cookies.planeatuid; //this is coming from a hidden cookie from the request
    if (userId) { // the request doesnt have the cookie
        try {
            const logUserOut = await admin.auth().revokeRefreshTokens(userId);
            res.clearCookie("planeatuid")
            console.warn(logUserOut);
            // const idToken = user.getIdToken();
            // const refreshToken = await admin.auth().createCustomToken(user.uid);
            // console.warn(idToken);
            return  {
                id: null,
                emailVerifed: null,
                refreshToken: null,
                permissions: null,
                error: null
            }
        } catch (error) {
            console.warn('Error signing out', error);
            return {
                "uid": null,
                "emailVerified": null,
                "refreshToken": null,
                "permissions": null,
                error: error
            }
        }
    }

    // the user is already logged out
    return {
        "uid": null,
        "emailVerified": null,
        "refreshToken": null,
        "permissions": null,
        error: null
    }
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

const refreshSession = async () => {

}

const updateUser = async userObj => {}

const deleteUser = async userID => {}



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

module.exports = {
  getUser,
  getUsers,
  addUser,
  signIn,
//   updateUser,
//   deleteUser
};
