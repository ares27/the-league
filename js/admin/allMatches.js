const allMatchesRow = document.querySelector('.all-matches-row');



// Get all Matches data
db.collection('matches').get().then(snapshot => {
        //console.log(snapshot.docs);
        setupAllMatches(snapshot.docs)   
    })
    .catch(err => {
        console.log("err: ", err);
    })


// Setup all Matches
const setupAllMatches = (data) => {

    let html = '';

    data.forEach(doc => {
    
        const match = doc.data();
        console.log("match: ", match);
    
        let myHTML = `
            <div class="col mb-4">
                <div class="card player-card text-center" style="width: 20em;">
                    <img src="https://cdn.weartesters.com/wp-content/uploads/2017/09/nikexea-hypervenom-3-2.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">Match Card</h5>
                    <p>    
                        <div class="row justify-content-between">
                            <div class="col">${match.p1name}</div>
                            <div class="col text-warning text">VS</div>
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
                    <p class="card-text"> <small class="text-muted">Last updated 3 mins ago</small> </p>
                    </div>
                </div>
            </div>
        `;

        html += myHTML;
    })
    
    allMatchesRow.innerHTML = html;
  
}








































/*
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
*/