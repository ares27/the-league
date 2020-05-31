let userId = '';

// Listen for auth state
auth.onAuthStateChanged(user => {
    //console.log(user);

    if(user) {
        
        console.log("User logged in: ", user);
        setupUserProfile(user);
           
        
    } else {
        console.log("User logged out: ", user);
   
    }
});


const setupUserProfile = (user) => {

    //console.log("uid: ", user.uid);  
    let userRef = user.uid;

    // Set userId
    userId = user.uid;
    
    // Get player info
    db.collection("players").doc(userRef).get().then(doc => {  
            
        const player = doc.data(); 
        console.log(doc.id, ", user ==> ", player);

        // Set user field values
        $('#email-profile').val(player.email).attr('readonly', true);
        $('#name-profile').val(player.name).attr('readonly', true);
        $('#slogan-profile').val(player.slogan).attr('readonly', true);

    }, err => {
        console.log("Error getting user data: ", err);
    })
    
}













// Edit Profile
const editBtn = document.querySelector('#profile-edit-btn')
const saveBtn = document.querySelector('#profile-save-btn')
const cancelBtn = document.querySelector('#profile-cancel-btn')

editBtn.addEventListener('click', (e) => {
    e.preventDefault();

    $('#name-profile').attr('readonly', false);
    $('#slogan-profile').attr('readonly', false);

    editBtn.style.display = 'none';

    setTimeout(() => {
        
        saveBtn.style.display = 'inline';
        cancelBtn.style.display = 'inline';

    }, 1500)
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    $('#name-profile').attr('readonly', true);
    $('#slogan-profile').attr('readonly', true);

    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';

    setTimeout(() => {
        
        editBtn.style.display = 'inline';       

    }, 1500)
})

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log($('#email-profile').val(), $('#name-profile').val(), $('#slogan-profile').val());
    
})



























// Upload Photo
const uploadBtn = document.querySelector('#upload-btn')
const uploadFile = document.querySelector('#upload-file')
let file = [];
let fileName = '';


// Get File
uploadFile.addEventListener('change', (e) => {
    console.log(e.target.files[0]);
    file = e.target.files[0];
    fileName = file.name;
})

uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("userId: ", userId);

    // Upload File
    let storageRef = firebase.storage().ref('/playerAvatar/' + userId + "/" + fileName);
    console.log(storageRef);

    storageRef.put(file)
        .then(snapshot => {
            console.log("snapshot: ", snapshot);

            window.location.href = "./MyProfile.html";
        })
        .catch(err => {
            console.log("error: ", err);
        })
      
})
  























// Add a new document in collection "cities"
/*db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});*/