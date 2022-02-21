import addMoneyForm from "./modules/addMoneyForm"
import addExpenseBtn from './modules/add-expense'
if(document.querySelector(".add-btn")){
    new addMoneyForm()
}

if(document.querySelector(".add-expense-btn")){
    
    new addExpenseBtn()
}

// alert("hello")
// new addMoneyForm()