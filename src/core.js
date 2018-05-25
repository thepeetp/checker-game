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
            results.push({
                id: childSnapshot.key,
                title: childSnapshot.val().title
            });
        })
        callback(results);
    });
  }

  export function addNewRoom(title, pieces, callback) {
    let newRoom = database.ref('rooms').push(title);
    newRoom.set({
        status: 'available',
        title: title,
        A: {pieces},
        B: {pieces}
    });
    callback(newRoom.key);
  }

  
  export function watchMovement(roomId, callback) {
    database.ref('rooms/' + roomId).on('value', function(snapshot) {
        let val = snapshot.val();
        callback({
            A: val.A.pieces,
            B: val.B.pieces
        });
    });
  }

  export function updateMovement(roomId, aPieces, bPieces) {
    database.ref('rooms/' + roomId + '/A/pieces').set(aPieces);
    database.ref('rooms/' + roomId + '/B/pieces').set(bPieces);
  }