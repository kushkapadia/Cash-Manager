const Expense = require('../models/Expense')
const Money=require('../models/Money')

exports.home = async function(req, res){
    let balance = 0
    let money = new Money()
    let curBalance = await  money.checkBalance()
    if(curBalance.length){
    balance = String(curBalance[0].balance)
    }
let expense = new Expense()
let expenses = await expense.getExpenses()
console.log(expenses)

    res.render("homepage", {
        curBalance:balance,
        expenses: expenses
    })
}