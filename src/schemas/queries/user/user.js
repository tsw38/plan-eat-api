const { firestore, admin, client } = require("../../../config/firebase.config");
const uuid 		                   = require('uuid/v4');
const chalk                        = require('chalk');

const signIn = async ({email, password, req,res}) => {
    const userId = req.cookies.planeatuid; //this is coming from a hidden cookie from the request
    console.warn('USER ID:', userId);
    if (!userId) { // the request doesnt have the cookie
        if(email && password) { //user is attempting to sign in normally
            try {
                const {user} = await client.auth().signInWithEmailAndPassword(email, password);
                //TODO: GET PERMISSIONS OF THE USER
                // console.log(chalk.green(`got the user id: ${user.uid}`));
                res.cookie("planeatuid", user.uid, {
                    httpOnly: false,
                    secure: false, //change to true if you are using https
                    maxAge: 1000 * 60 * 60 * 24 * 7 //one week cookie age
                })

                return {
                    uid: user.uid,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    permissions: '111',
                    displayName: user.displayName,
                    error: ''
                }
            } catch ({message}) {
                console.warn('INCORRECT USER SIGNIN', message);
                return {
                    uid: null,
                    emailVerified: null,
                    refreshToken: null,
                    permissions: null,
                    email: null,
                    displayName: null,
                    error: message
                }
            }
        } else { // user is trying to get session while not having a session cookie
            return {
                uid: null,
                email: null,
                emailVerified: null,
                refreshToken: null,
                permissions: null,
                displayName: null,
                error: ''
                // error: 'Unable to grab session, please sign in'
            }
        }
    }

    try {
        const userRecord = await admin.auth().getUser(userId);
        //TODO: GET PERMISSIONS FOR THE USER
        // console.warn('this is the user record', userRecord);

        return {
            uid: userRecord.uid,
            email: userRecord.email,
            emailVerified: userRecord.emailVerified,
            permissions: '111',
            displayName: userRecord.displayName,
            error: ''
        }
    } catch ({message}) {
        // console.log(chalk.red('userId existed but something went wrong'), userId);
        res.clearCookie("planeatuid")
        return {
            uid: null,
            email: null,
            emailVerified: null,
            refreshToken: null,
            permissions: null,
            displayName: null,
            error: message
        }
    }
}

const signOut = async ({req,res}) => {
    const userId = req.cookies.planeatuid; //this is coming from a hidden cookie from the request
    if (userId) { // the request doesnt have the cookie
        try {
            const logUserOut = await admin.auth().revokeRefreshTokens(userId);
            res.clearCookie("planeatuid");

            return  {
                id: null,
                error: null,
                success: true,
                permissions: null,
                displayName: null,
                refreshToken: null,
                emailVerifed: null
            }
        } catch ({message}) {
            return {
                id: null,
                error: message,
                success: true,
                permissions: null,
                displayName: null,
                refreshToken: null,
                emailVerifed: null
            }
        }
    }

    // the user is already logged out
    return {
        id: null,
        error: null,
        success: false,
        permissions: null,
        displayName: null,
        refreshToken: null,
        emailVerifed: null
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
  signOut
//   updateUser,
//   deleteUser
};
