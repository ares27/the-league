const myCardsDiv = $('.danger-div')
const allPlayersDiv = $('.success-div')
const allMatchesDiv = $('.primary-div')
const mainContainer = document.querySelector('#main-container')
const myCards = document.querySelector('.my-cards')
let myCardsHTML = '';
const playerCard = document.querySelector('.player-card')
let playerCardHTML = '';
const matchCard = document.querySelector('.match-card')
let matchCardHTML = '';
const welcomeContainer = document.querySelector('.welcome-container')
const createMatchForm = document.querySelector('#create-match-form')
const playerOneSelect = document.querySelector('#playerOneSelect')
const playerTwoSelect = document.querySelector('#playerTwoSelect')
let playerOptions = '';
const adminItems = document.querySelectorAll('.admin')


//  Welcome User 
const setupUserUI = (user) => {
    
    if(user) {
        //console.log("setupUserUI", user);
        console.log(user.admin ? 'user is admin': 'user is not admin');
        // check if user is admin
        if(user.admin) {
             adminItems.forEach(item => item.style.display = 'block');
        }

        let html = `
                <h2>Logged in as ${user.email}</h2>
                <p class="text-red">${user.admin ? 'Admin' : ''}</p>
        `;

        welcomeContainer.innerHTML = html;

    } else {
        console.log("No user found.");

        adminItems.forEach(item => item.style.display = 'none');
        welcomeContainer.innerHTML = '';
        
    }
}





// Add admin  cloud function
const adminForm = document.querySelector('.make-admin-container')
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email-input').value;
    const addAdminRole = functions.httpsCallable("addAdminRole");
    
    addAdminRole({ email: adminEmail })
        .then(res => {
            console.log(res);
        })


})








// Show myCards
myCardsDiv.on('click', () => { 
    mainContainer.innerHTML = myCardsHTML;
});

// setup myCards
const setupMyCards = (user) => {

    //console.log("setupMyCards: ", user);


    db.collection("playercards").where("ownerId", "==", user.uid)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const card = doc.data(); 
            //console.log(doc.id, ", card ==> ", card);
            
            let myHtml = `
                <div class="card my-cards">
                    <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${card.ownerName} wins!</h5>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            `;

        myCardsHTML += myHtml;
            
        });
    }, err => {
        console.log("Error getting documents: ", err);
    })

    /*
    data.forEach(doc => {
        const playerCard = doc.data();
        console.log("playerCard", playerCard);          
        
        let myHtml = `
            <div class="card my-cards">
                <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${playerCard.ownerName} wins!</h5>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        `;

        myCardsHTML += myHtml;

    })
    //console.log("userId: ", user.uid);


    
   
         // Create a reference to the cities collection
        //  db.collection("playercards").where("ownerName", "==", "Nathan").get().then((snapshot) => {
        //     snapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });


    */
}






// Show all Players
allPlayersDiv.on('click', () => {    
    mainContainer.innerHTML = playerCardHTML;
});

// setup Players
const setupPlayers = (data) => {


    // setup players and options
    data.forEach(doc => {
        //console.log(doc.data());
        const player = doc.data();
        //console.log("player: ", player);

        let playerHTML = `
            <option value=${doc.ref.id}>${player.name}</option>
        `;

        playerOptions += playerHTML;

       
        let html = `
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col mb-4">
                <div class="card player-card" style="width: 20em;">
                    <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${player.name}</h5>
                    <p class="card-text"> <strong>Slogan:</strong> My day today!</p>
                    <p class="card-text"> <strong>Wins:</strong> 10</p>
                    <p class="card-text"> <strong>Losses:</strong> 5</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        `;

        playerOneSelect.innerHTML = playerOptions;
        playerTwoSelect.innerHTML = playerOptions;

        playerCardHTML += html;
    });
    
}















// Show all Matches
allMatchesDiv.on('click', () => {
    //console.log(matchCardHTML);
    mainContainer.innerHTML = matchCardHTML;
});


// setup Matches
const setupMatches = (data) => {

    //console.log("setupMatches: ", data);
    
    data.forEach(doc => {
        const match = doc.data();
        //console.log("Match Data: ", match);

        let html = `
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col mb-4">
                    <div class="card match-card" style="width: 20em;">
                        <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                        <p class="card-title h3">Match Day</p>
                        <p>    
                            <div class="row justify-content-between">
                                <div class="col">${match.p1name}</div>
                                <div class="col">VS</div>
                                <div class="col">${match.p2name}</div>
                            </div>
                        </p>
                        <p>
                            <div class="row justify-content-between">
                                <div class="col">${match.playeronescore}</div>
                                <div class="col"></div>
                                <div class="col">${match.playertwoscore}</div>
                            </div>
                        <p/>
                        <p class="card-text"><small class="text-muted">Winner: ${match.winner}</small></p>
                        <p class="card-text"><small class="text-muted">Loser: ${match.loser}</small></p>
                        <small class="text-muted">Last updated 3 mins ago</small></p>
                        
                </div>
            </div>
        </div>
    `;

    matchCardHTML += html;
    })

   
    
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
    //console.log(parseInt(createMatchForm['p1score'].value), parseInt(createMatchForm['p2score'].value));
    //console.log("winner: ", winner, ", loser: ", loser);


  
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
         document.querySelector('.alert-success').style.display = 'block';

         // Create Player Card
         return db.collection('playercards').add({
             ownerId: winnerId,
             matchId: res.id,
             ownerName: winner           
         });

     })
     .then((res) => {

             console.log("create Player Card: ", res);
             window.location.href = "/routes/home.html";
       
     }, err => {
         console.log("err", err);
         document.querySelector('.alert-warning').style.display = 'block';
     })

})






