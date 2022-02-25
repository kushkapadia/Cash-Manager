const Expense = require('../models/Expense')
const Money=require('../models/Money')

exports.passwordProtected = function(req, res, next)
{
 res.set('WWW-Authenticate', 'Basic realm="Kush"')
console.log(req.headers.authorization)
if(req.headers.authorization == "Basic S3VzaDpqYWltYWhlc2htYXRp"){
  next() //This will tell, this function is done, now move on and go to the next argumented that u included below.
}
else{
  res.status(401).send("Authentication Required")
}

}

exports.home = async function(req, res){
    let balance = 0
    let money = new Money()
    let curBalance = await  money.checkBalance()
    if(curBalance.length){
    balance = String(curBalance[0].balance)
    }
let expense = new Expense()
let expenses = await (await expense.getExpenses()).filter({status:false}).sort({_id: -1}).limit(3).toArray()
// .filter((onlyUnpaid)=>{
//     return onlyUnpaid.status == false 
// })
console.log(expenses)

    res.render("homepage", {
        curBalance:balance,
        expenses: expenses
    })
}