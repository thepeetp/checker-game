import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDSyMRs4_WAdn44EKsgOiFWogN2yUgOY1A",
    authDomain: "checker-game.firebaseapp.com",
    databaseURL: "https://checker-game.firebaseio.com",
    projectId: "checker-game",
    storageBucket: "checker-game.appspot.com",
    messagingSenderId: "352202384375"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  export function getAvailableRoom(callback) {
    database.ref('rooms').on('value', function(snapshot) {
        let results = [];
        snapshot.forEach(function(childSnapshot) {
            results.push(childSnapshot.val().title);
        })
        callback(results);
    });
  }

  export function addNewRoom(title) {
    let newRoom = database.ref('rooms').push(title);
    newRoom.set({
        status: 'available',
        title: title
    });
  }