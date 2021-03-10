

// document.querySelector('.buttonregister').addEventListener('click',()=>{

// var db = firebase.firestore();


// let user=document.querySelector('#username').value;
// let age=document.querySelector('#age').value;
// console.log(user);

// let priorityvalue=prioritycalc();

// db.collection("userdata").doc(user).set({
// name: user,
// age:age,
// priority:priorityvalue,
// },{merge:true})
// .then(() => {
// console.log("Document successfully written!");
// alert("success")
// })
// .catch((error) => {
// console.error("Error writing document: ", error);
// });

// })
// function prioritycalc(){
//     return "345";
// }