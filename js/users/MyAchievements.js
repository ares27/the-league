const allPlayerCardsRow = document.querySelector('.all-playercards-row');

// Get all Players data
db.collection('playercards').get()
     .then(snapshot => {
        //console.log("playercards:",snapshot.docs);  
        setupPlayerCards(snapshot.docs);       
         
     })
     .catch(err => {
         console.log("err: ", err);
     })




// Setup all Players
const setupPlayerCards = (data) => {

    let html = '';

    data.forEach(doc => {

    const playerCard = doc.data();
    //console.log("player: ", playerCard);

    let myHTML = `
            <div class="col mb-4">
                <div class="card my-cards" style="width:20rem">
                    <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${playerCard.ownerName}</h5>
                    <p class="card-text">
                    <small class="text-muted">OWNED</small><br />
                    <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                </div>
            </div>
        `;

        html += myHTML;
     })
    
     allPlayerCardsRow.innerHTML = html;
}
