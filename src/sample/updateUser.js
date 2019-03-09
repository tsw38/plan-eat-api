var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

const uid = "hIefPrkYQYYH9lG1UaqFL3ITcko1"; //joey

firebase.auth().updateUser(uid, {
    displayName: "Joseph Fagnilli",
  })
.then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated user", userRecord.toJSON());
})
.catch(function(error) {
    console.log("Error updating user:", error);
});