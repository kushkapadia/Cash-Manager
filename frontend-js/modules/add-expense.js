export default class addExpense {

    constructor() {
        this.addExpenseBtn = document.querySelector(".add-expense-btn")
        this.popup = document.querySelector(".expense-popup")
        this.closePopup = document.querySelector(".closeExp")
    this.events()
    }

    //events
    events(){
this.addExpenseBtn.addEventListener('click', ()=>{
    this.popup.style.display = "flex"
})

this.closePopup.addEventListener("click", ()=>{
    this.popup.style.display = "none"
 })
    }

    //methods
}