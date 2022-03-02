const { format } = require('express/lib/response')
const Expense = require('../models/Expense')
const Money = require('../models/Money')
const moneyController = require('./moneyController')




exports.saveExpense = async function(req, res){
   
        let data = {
balance:0,
        }
        let money = new Money(data)
    await  money.addMoney()
await money.subtractBal(req.body.amountSpent)
let expense = new Expense(req.body)
// console.log(req.body)
await expense.saveExpense()
res.redirect('/')

}

exports.paid = async function(req, res){

let expense = new Expense()


try{
    let results = await expense.paid(req.body._id)
    // console.log(results)
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
let expenses = await (await expense.getExpenses()).sort({purchadeDate:-1}).filter({status: false}).toArray()
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

exports.delete = async function(req, res){
    await Expense.delete(req.body.DeletionId)
res.redirect('/')
}

exports.edit = async function(req, res){
    let expense = await Expense.findSingleById(req.params.id)

  var date = expense.purchaseDate;
 let stringDate = date.yyyymmdd();

res.render('edit-expense', {
    expense : expense,
    purchaseDate: stringDate
})
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };

  exports.actuallyEdit = async function(req, res){
    //   console.log(req.params.id)
    let oldExpense= await Expense.edit(req.params.id, req.body)
    let money = new Money()

    if(oldExpense.value.amount < Number( req.body.amountSpent)){
let diff = Number(req.body.amountSpent) - oldExpense.value.amount
// console.log("Sub:" + diff)
await money.subtractBal(diff)
    } else{
        let diff = oldExpense.value.amount - Number(req.body.amountSpent)
        // console.log("Add:" + diff)
        await money.addBalance(diff)
    }

// console.log(oldExpense.value)
// console.log(req.body.amountSpent)
     res.redirect('/')
  }