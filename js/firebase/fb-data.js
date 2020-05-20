// Get match data
db.collection('matches').get()
    .then(snapshot => {
        //console.log(snapshot.docs);
        setupAllMatches(snapshot.docs)
        setupMatches(snapshot.docs);
    })
    .catch(err => {
        console.log("err: ", err);
    })


// Get players data
db.collection('players').get()
    .then(snapshot => {
        //console.log("allplayers:",snapshot.docs);
        playerOptions(snapshot.docs);
        //setupAllPlayers(snapshot.docs);
        // setupPlayers(snapshot.docs);
    })
    .catch(err => {
        console.log("err: ", err);
    })


// Get player Cards
//  db.collection('playercards').get()
//      .then(snapshot => {
//          console.log("playerCards: ", snapshot.docs);
//          setupMyCards(snapshot.docs);
//      }, err => {
//          console.log("err: ", err);
//      })

// db.collection("playercards").get().then((querySnapshot) => {
//     querySnapshot.forEach(doc => {
//         setupMyCards(doc.data());
//     });
// })
