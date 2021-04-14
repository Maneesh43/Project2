var db=firebase.firestore();
// db.collection("cities").where("capital", "==", true)
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });


let data=[];
db.collection("userdata").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(a);
        data.push(doc.data());
        // console.log("changed");
    });
    // console.log(data);
    populatedata(data);
});

function populatedata(data){


    let tablebody=document.querySelector(".dataholder tbody");
    for(i=0;i<data.length;i++){
        let tr=document.createElement("tr")
        tr.className="datarow";
        tablebody.appendChild(tr);
        
    }
    let trlist=document.querySelectorAll(".datarow");
    for(i=0;i<trlist.length;i++){
        trlist[i].innerHTML=`<td>${data[i].name}</td><td>${data[i].age}</td><td>${data[i].sex}</td><td>${data[i].priority}</td><td>${data[i].vaccinecenter}</td>`
    }


}
