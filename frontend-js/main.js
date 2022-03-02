import addMoneyForm from "./modules/addMoneyForm"
import addExpenseBtn from './modules/add-expense'
import EditExpense from "./modules/edit-expense"
if(document.querySelector(".add-btn")){
    new addMoneyForm()
}

if(document.querySelector(".add-expense-btn")){
    
    new addExpenseBtn()
}

if(document.querySelector("#edit-exp-btn")){
    
    new EditExpense()
}

// alert("hello")
// new addMoneyForm()