var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

// const uid = "hIefPrkYQYYH9lG1UaqFL3ITcko1"; //joey
const uid = "AXe8cJpuZJRNVbw9ZzJdIh8lQ962"; //tyler

firebase.auth().updateUser(uid, {
    // displayName: "Joseph Fagnilli",
    photoURL: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/32640616_10211979593140875_184923463356514304_o.jpg?_nc_cat=101&_nc_ht=scontent-sjc3-1.xx&oh=03d565d57634a01db0d91feb2cc4740b&oe=5D17FFC1'
  })
.then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated user", userRecord.toJSON());
})
.catch(function(error) {
    console.log("Error updating user:", error);
});