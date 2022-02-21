const Expense = require('../models/Expense')
const Money = require('../models/Money')
const moneyController = require('./moneyController')
// const moneyController = require('./moneyController')
//amountSpent: Number(this.data.amountSpent)



exports.saveExpense = async function(req, res){
    try{
        let money = new Money()
await money.subtractBal(req.body.amountSpent)
let expense = new Expense(req.body)
await expense.saveExpense()
res.redirect('/')
    }
    catch{
res.send("Error")
    }
}