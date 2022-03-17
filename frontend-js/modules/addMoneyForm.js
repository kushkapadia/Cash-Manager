export default class addMoneyForm{
    constructor(){
        this.addBtn = document.querySelector(".add-btn")
        this.popup = document.querySelector(".popup")
        this.closePopup = document.querySelector(".close")
        this.events()
        // if(5 == 6){
        // notify()
        // }
    }

    events(){
        
        this.addBtn.addEventListener("click", ()=>{
           this.popup.style.display = "flex"
        })

        this.closePopup.addEventListener("click", ()=>{
           this.popup.style.display = "none"
        })
        
    }
}

             


// function showNotification(){
//     const notification = new Notification("New Message From Kush!", {
//         body: "Hi buddy! How ar you?",
//         icon: "",

//     })
// notification.onclick = (e) =>{
//     window.location.href = "https://google.com"
// }
// }


// function notify(){
//         // default, granted, denied
//         console.log(Notification.permission);
//         if (Notification.permission == "granted") {
//             showNotification()
//          } else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(permission  =>{
//                 if(permission == "granted"){
//                 showNotification()
//                 }
//             });
//         }
//     }