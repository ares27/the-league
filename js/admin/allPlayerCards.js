const allPlayerCards = document.querySelector('.all-playercards-row');
//const playerCard = '';


// Get all Players data
db.collection('playercards').get()
     .then(snapshot => {
         //console.log("allCards:",snapshot.docs);         
         setupAllPlayerCards(snapshot.docs);
     })
     .catch(err => {
         console.log("err: ", err);
     })




// Setup all Player Cards
const setupAllPlayerCards = (data) => {

    let html = '';
    //console.log("All Player Cards: ", data);

     data.forEach(doc => {
    
        const playerCard = doc.data();
        //console.log("playerCard: ", playerCard);

        let myHTML = `
             <div class="col mb-4">
               <div class="card player-card" style="width: 20em;">
                   <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                   <div class="card-body">
                   <h5 class="card-title">${playerCard.ownerName}</h5>
                     <p class="card-text"> <strong>OWNED </strong> </p>
                     <p class="card-text"> <small class="text-muted">Date Played: ${playerCard.matchDate}</small> </p>
                   </div>
               </div>
             </div>
        `;

        html += myHTML;
     })
    
     allPlayerCards.innerHTML = html;
  
}