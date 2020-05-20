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
    console.log("setupAllPlayers");

     data.forEach(doc => {
    
         const player = doc.data();
         console.log("player: ", player);
    
        let myHTML = `
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

         html += myHTML;
     })
    
    allPlayersRow.innerHTML = html;
  
}