var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
 acc[i].addEventListener("click", function() {
   // console.log(this.childNodes);

   this.classList.toggle("active");
   var panel = this.nextElementSibling;
   if (panel.style.maxHeight) {

     panel.style.maxHeight = null;
     // console.log(this.childNodes);
     this.childNodes[1].style.transform="rotate(0deg)"
   } else {
     panel.style.maxHeight = panel.scrollHeight + "px";
     // console.log(this.childNodes[1]);
     this.childNodes[1].style.transform="rotate(90deg)";
     // this.childNodes[1].style.color="blue";
   }
 });
}
let f=document.querySelector(".faqb");
f.style.fontWeight="bolder";
let p=document.querySelector(".precautionsb");
let m=document.querySelector(".mythsb");

let f1=document.querySelector(".faqs");
let p1=document.querySelector(".precautions");
let m1=document.querySelector(".myths");

p.addEventListener("click",()=>{
f1.style.display="none";
m1.style.display="none";
p1.style.display="block";
p.style.fontWeight="bolder";
[f,m].forEach(item=>{
  item.style.fontWeight="normal";
})
p.style.fontWeight="bolder";

})

f.addEventListener("click",()=>{
 p1.style.display="none";
 m1.style.display="none";
 f1.style.display="block";

 [p,m].forEach(item=>{
  item.style.fontWeight="normal";
})
f.style.fontWeight="bolder";

})

m.addEventListener("click",()=>{
 f1.style.display="none";
 p1.style.display="none";
 m1.style.display="block";
 [p,m].forEach(item=>{
  item.style.fontWeight="normal";
})
m.style.fontWeight="bolder";

})


document.querySelector("#offlineback").addEventListener("click",()=>{
    // console.log(this);
    // window.history.back();
    window.location.assign("offline.html");
  })