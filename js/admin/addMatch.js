const createMatchForm = document.querySelector('#create-match-form')
const playerOneSelect = document.querySelector('#playerOneSelect')
const playerTwoSelect = document.querySelector('#playerTwoSelect')




// setup Players
const playerOptions = (data) => {

    //console.log("playerOptions");
    let options = '';

    data.forEach(doc => {
    
        //console.log(doc.data());
        const player = doc.data();
        console.log("player: ", player);

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

// Create New Match
createMatchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log("value:", createMatchForm['playerOneSelect'].value);

    // calculate winner
    let s1 = parseInt(createMatchForm['p1score'].value);
    let s2 = parseInt(createMatchForm['p2score'].value);
    let winnerId = null;
    let winner   = '';
    let loserId  = null;
    let loser = '';
    let draw = false;

    if(s1 > s2) {
        
        winnerId = createMatchForm['playerOneSelect'].value;
        winner = $("#playerOneSelect option:selected").text();
        loserId = createMatchForm['playerTwoSelect'].value;
        loser = $("#playerTwoSelect option:selected").text();
    } 
    else {

        winnerId = createMatchForm['playerTwoSelect'].value;
        winner = $("#playerTwoSelect option:selected").text();
        loserId = createMatchForm['playerOneSelect'].value;
        loser = $("#playerOneSelect option:selected").text();
    } 
    if (s2 === s1) {
        
        winnerId = null;
        winner = '';
        loserId = null;
        loser = '';
        draw = true;
    }
    ////////////////////
    console.log(parseInt(createMatchForm['p1score'].value), parseInt(createMatchForm['p2score'].value));
    console.log( draw ? "its a draw" : {"winner": winner, "loser": loser});


  
        // Create New Match
    db.collection('matches').add({
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
        draw: draw 
    }).then((res) => {

            console.log(res);

            // reset form input
            createMatchForm.reset();

            document.querySelector('.save-btn').style.display = 'none';
            $('.alert-success-message').text("Match created successfully.");
            

        // Create Player Card
        return db.collection('playercards').add({
            ownerId: winnerId,
            matchId: res.id,
            ownerName: winner           
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
