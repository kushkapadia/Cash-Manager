
const Expense = require('../models/Expense')
const Money=require('../models/Money')
const User = require('../models/User')
exports.passwordProtected = function(req, res, next)
{
 res.set('WWW-Authenticate', 'Basic realm="Kush"')
// console.log(req.headers.authorization)
if(req.headers.authorization == "Basic S3VzaDpqYWltYWhlc2htYXRp"){
  next() //This will tell, this function is done, now move on and go to the next argumented that u included below.
}
else{
  res.status(401).send("Authentication Required")
}

}

exports.login = function(req, res){
let user = new User(req.body)

 user.login().then((result) => {
  req.session.user = {username: user.data.username, _id: user.data._id}
  req.session.save(function(){
    res.redirect('/')
  })
}).catch((e)=>{
 req.session.save(function(){
  res.redirect('/')

 })

      })
}



exports.register = function(req, res){
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = {username: user.data.username, _id: user.data._id}
    req.session.save(function(){
        res.redirect('/')
    })

}).catch((regErrors)=>{
  
    req.session.save(function(){
        res.redirect('/')
    })
})
}
  

exports.logout = function(req, res){
 req.session.destroy(function(){
  res.redirect('/')
 })

}

exports.home = async function(req, res){
if(req.session.user){
  let balance = 0
  let money = new Money()
  let curBalance = await  money.checkBalance(req.session.user._id)
  if(curBalance.length){
  balance = String(curBalance[0].balance)
  }
let expense = new Expense()
// let expenses = await (await expense.getExpenses(req.session.user._id)).filter({status:false}).sort({purchaseDate: -1}).limit(3).toArray()
let expenses = await expense.getExpenses(req.session.user._id)
  res.render("homepage", {
      curBalance:balance,
      expenses: expenses
  })

} else{
  res.render('homePage-guest')
}
}

// exports.homeMain = async function(req, res){
//     let balance = 0
//     let money = new Money()
//     let curBalance = await  money.checkBalance()
//     if(curBalance.length){
//     balance = String(curBalance[0].balance)
//     }
// let expense = new Expense()
// let expenses = await (await expense.getExpenses()).filter({status:false}).sort({purchaseDate: -1}).limit(3).toArray()
// // .filter((onlyUnpaid)=>{
// //     return onlyUnpaid.status == false 
// // })
// // console.log(expenses)

//     res.render("homepage", {
//         curBalance:balance,
//         expenses: expenses
//     })
// }