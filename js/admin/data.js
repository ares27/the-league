db.collection('players').get()
    .then(snapshot => {
        //console.log("allplayers:",snapshot.docs);
        
        // Get Player options
        playerOptions(snapshot.docs);
        
    })
    .catch(err => {
        console.log("err: ", err);
    })
