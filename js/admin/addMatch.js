const createMatchForm = document.querySelector('#create-match-form')
const playerOneSelect = document.querySelector('#playerOneSelect')
const playerTwoSelect = document.querySelector('#playerTwoSelect')
let matchReferee = '';







// setup Players
const playerOptions = (data) => {

    //console.log("playerOptions");
    let options = '';

    data.forEach(doc => {
    
        //console.log(doc.data());
        const player = doc.data();
        //console.log("player: ", player);

        let playerHTML = `
            <option value=${doc.ref.id}>${player.name}</option>
        `;

        options += playerHTML;

        // insert player options
        playerOneSelect.innerHTML = options;
        playerTwoSelect.innerHTML = options;

    });

    playerCardHTML += html;
}















// ************************************************************************************ 
// Create New Match Config
//
// ************************************************************************************
let matchDateInput = document.querySelector('#match-date');
let currentDateTime = new Date();

//set match date
matchDateInput.value = currentDateTime.getFullYear().toString() + '-' + (currentDateTime.getMonth() + 1).toString().padStart(2, 0) + '-' + currentDateTime.getDate().toString().padStart(2, 0);

//set match referee
auth.onAuthStateChanged(user => {
    
    if(user) {
     
        //console.log("uid:", user.uid);
        // Set Match Referee 
        let docRef = db.collection("players").doc(user.uid);
        docRef.get().then(doc => {
            if (doc.exists) {
                const referee = doc.data(); 
                //console.log("Referee:", referee);

                // Set Referee
                matchReferee = referee.name;                
                $('#match-referee').val(matchReferee);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
  
    } else {
        console.log("User logged out: ", user);  
    }
});






// Create New Match
createMatchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log("value:", createMatchForm['playerOneSelect'].value);

    // calculate winner
    let s1 = parseInt(createMatchForm['p1score'].value);
    let s2 = parseInt(createMatchForm['p2score'].value);
    let winnerScore = 0;
    let loserScore = 0;
    let winnerId = null;
    let winner   = '';
    let loserId  = null;
    let loser = '';
    let draw = false;
    let matchType = parseInt(createMatchForm['match-type'].value);

    if(s1 > s2) {
        
        winnerId = createMatchForm['playerOneSelect'].value;
        winner = $("#playerOneSelect option:selected").text();
        loserId = createMatchForm['playerTwoSelect'].value;
        loser = $("#playerTwoSelect option:selected").text();

        winnerScore = s1;
        loserScore = s2;
    } 
    else {

        winnerId = createMatchForm['playerTwoSelect'].value;
        winner = $("#playerTwoSelect option:selected").text();
        loserId = createMatchForm['playerOneSelect'].value;
        loser = $("#playerOneSelect option:selected").text();

        winnerScore = s2;
        loserScore = s1;
    } 
    if (s2 === s1) {
        
        winnerId = null;
        winner = '';
        loserId = null;
        loser = '';
        draw = true;

        winnerScore = 0;
        loserScore = 0;
    }
    ////////////////////
    console.log(parseInt(createMatchForm['p1score'].value), parseInt(createMatchForm['p2score'].value));
    console.log( draw ? "its a draw" : {"winner": winner, "loser": loser});


  
    // Create New Match
    db.collection('matches').add({
        date: Date.now(),
        createdDate: Date().substring(0, 15),
        matchDate: createMatchForm['match-date'].value,
        p1name: $("#playerOneSelect option:selected").text(),
        playerone: createMatchForm['playerOneSelect'].value,
        playeronescore: createMatchForm['p1score'].value,
        p2name: $("#playerTwoSelect option:selected").text(),
        playertwo: createMatchForm['playerTwoSelect'].value,
        playertwoscore: createMatchForm['p2score'].value,
        winnerId: winnerId,
        winner: winner,
        loserId: loserId,
        loser: loser,
        draw: draw,
        matchType: matchType,
        matchReferee, matchReferee 
    }).then((res) => {

        console.log(res);

        // reset form input
        createMatchForm.reset();

        document.querySelector('.save-btn').style.display = 'none';
        $('.alert-success-message').text("Match created successfully.");
            

        // Create Player Card
        return db.collection('playercards').add({
            createdDate: Date.now(),
            matchDate: createMatchForm['match-date'].value,
            ownerId: winnerId,
            matchId: res.id,
            ownerName: winner,
            winnerscore: winnerScore,
            loserscore: loserScore
        })
    })
    .then((res) => {

        console.log("create Player Card: ", res);
        window.location.href = "./home.html";
    
    }, err => {
        console.log("err", err);
        $('.alert-fail-message').text("Match created successfully.")
    })

})



// ************************************************************************************ 
// END Match Config
//
// ************************************************************************************
