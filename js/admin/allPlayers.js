const allPlayersRow = document.querySelector('.all-players-row');
const playerCard = '';


// Get all Players data
db.collection('players').get()
     .then(snapshot => {
         //console.log("allplayers:",snapshot.docs);         
         setupAllPlayers(snapshot.docs);
     })
     .catch(err => {
         console.log("err: ", err);
     })




// Setup all Players
const setupAllPlayers = (data) => {

    let html = '';
    console.log("All Players: ", data);

     data.forEach(doc => {
    
        const player = doc.data();
    
        let myHTML = `
            <div class="card">
                <div class="card-image"></div>
                <div class="card-text">
                <span class="date">4 days ago</span>
                <h3>${player.name}</h3>
                <p>${player.slogan}</p>
                </div>
                <div class="card-stats">
                    <div class="stat">
                        <div class="value">4<sup>m</sup></div>
                        <div class="type">WINS</div>
                    </div>
                    <div class="stat">
                        <div class="value">20</div>
                        <div class="type">AGE</div>
                    </div>
                    <div class="stat">
                        <div class="value">R</div>
                        <div class="type">FOOT</div>
                    </div>
                </div>
            </div>
         `;

         html += myHTML;
     })
    
    allPlayersRow.innerHTML = html;
  
}




