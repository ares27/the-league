/*
const storageRef = storage.ref();
console.log("storageRef:", storageRef);

const imagesRef = storageRef.child('/playerAvatar');
console.log("imagesRef:", imagesRef);

let gsRef = storage.refFromURL('gs://the-league-66947.appspot.com/playerAvatar/8zAyaIYNvbbeq3LPGZnz3JMkDwG2/GentleMen_logo.jpg');
console.log("gsRef:", gsRef);
*/
   
//gsRef.getDownloadURL().then(function(url) {
    //console.log(url);

    // Or inserted into an <img> element:
    //var img = document.getElementById('my-img');
    //img.src = url;

  
//});


// storage.refFromURL('gs://the-league-66947.appspot.com/playerAvatar/8zAyaIYNvbbeq3LPGZnz3JMkDwG2/').listAll()
//     .then(result => {
//         console.log(result);
//     })


// async function getList() {
//     let myRef =  await storage.refFromURL('gs://the-league-66947.appspot.com/playerAvatar/8zAyaIYNvbbeq3LPGZnz3JMkDwG2/').listAll();
//     console.log("myRef:", myRef);
// }

// getList();