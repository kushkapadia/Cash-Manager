const Expense = require('../models/Expense')
const Money = require('../models/Money')
const moneyController = require('./moneyController')
// const moneyController = require('./moneyController')
//amountSpent: Number(this.data.amountSpent)



exports.saveExpense = async function(req, res){
    // try{
        let data = {
balance:0,
        }
        let money = new Money(data)
    await  money.addMoney()
await money.subtractBal(req.body.amountSpent)
let expense = new Expense(req.body)
await expense.saveExpense()
res.redirect('/')
    // }
//     catch{
// res.send("Error")
//     }
}

exports.paid = async function(req, res){

let expense = new Expense()


try{
    let results = await expense.paid(req.body._id)
    console.log(results)
    let money = new Money()
    await money.addBalance(results)
    res.redirect("/")
}
catch{
    res.send("err")
}
}


exports.showAllExpenses = async function(req, res){
    let expense = new Expense()
let expenses = await (await expense.getExpenses()).sort({_id:-1}).filter({status: false}).toArray()
res.render('allExpenses', {
    expenses: expenses
})
}


exports.completeExpenseHistory = async function(req, res){
    let expense = new Expense()
let expenses =  await (await expense.getExpenses()).sort({purchaseDate:-1}).toArray()

res.render('payment-history', {
    expenses: expenses
})
}