const Money = require('../models/Money')

exports.addMoney = async function(req, res, next){
    console.log(req.body)
    let money = new Money(req.body)

    try{
    await money.addMoney()
    // res.send("Money Added")
    next()
    }
    catch{
        res.send("fatal error")
    }

}

exports.checkBalance = async function(req, res){
    let money = new Money()
    // let curBalance = [120]

    try{
 let curBalance = await   money.checkBalance()
 let balance = String(curBalance[0].balance)
 res.redirect('/')

 } catch{
res.send("error")
 }
  
}


exports.subtractBal = async function(req, res){
    try{
let money = new Money()
await money.subtractBal()
    }
    catch{
console.log("error")
    }
}