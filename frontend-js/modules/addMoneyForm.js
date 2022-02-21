export default class addMoneyForm{
    constructor(){
        this.addBtn = document.querySelector(".add-btn")
        this.popup = document.querySelector(".popup")
        this.closePopup = document.querySelector(".close")
        this.events()
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

             