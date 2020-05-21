const myAchievementsRow = document.querySelector('.all-my-achievements-row');

// Listen for auth state
auth.onAuthStateChanged(user => {
    //console.log(user);

    if(user) {
        //console.log("User logged in: ", user);
      
        // check if user exists
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            console.log("admin: ", user.admin);
            
            // send user data to get myCards
            setupMyCards(user);
        })

    } else {
        console.log("User logged out: ", user);    
        setupMyCards();
    }
});






const setupMyCards = (user) => {

    console.log("uid: ", user.uid);  
    let html = '';  
    
    db.collection("playercards").where("ownerId", "==", user.uid)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            
            const card = doc.data(); 
            console.log(doc.id, ", card ==> ", card);
            
            
            let myHtml = `
                <div class="card my-cards">
                    <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${card.ownerName} wins!</h5>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            `;

            html += myHtml;
        })

        myAchievementsRow.innerHTML = html; 
        
    }, err => {
        console.log("Error getting documents: ", err);
    })
    
}
    
    
    