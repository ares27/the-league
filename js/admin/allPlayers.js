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
             <div class="col mb-4">
               <div class="card player-card" style="width: 20em;">
                   <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                   <div class="card-body">
                   <h5 class="card-title">${player.name}</h5>
                     <p class="card-text"> <strong>Slogan: ${player.slogan}</strong></p>
                     <!--<p class="card-text"> <strong>Wins:</strong> 10</p>
                     <p class="card-text"> <strong>Losses:</strong> 5</p> -->
                     <p class="card-text"><small class="text-muted">Signed Up: ${player.createddate}</small></p>
                   </div>
               </div>
             </div>
         `;

         html += myHTML;
     })
    
    allPlayersRow.innerHTML = html;
  
}