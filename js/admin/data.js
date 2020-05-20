// Get players data
db.collection('players').get().then(snapshot => {
        //console.log("allplayers:",snapshot.docs);
        setupAllPlayers(snapshot.docs);
        
    })
    .catch(err => {
        console.log("err: ", err);
    })