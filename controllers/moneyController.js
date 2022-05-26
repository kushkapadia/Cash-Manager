const Money = require('../models/Money')

exports.addMoney = async function(req, res, next){
    let money = new Money(req.body, req.session.user._id)

    try{
    await money.addMoney(req.session.user._id)
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
 let curBalance = await   money.checkBalance(req.session.user._id)
 let balance = String(curBalance[0].balance)
 res.redirect('/')

 } catch{
res.send("error")
 }
}

 exports.completeWalletHistory = async function(req, res){
     let money = new Money()
    try{
        let historyDocs = await money.getWalletHistory(req.session.user._id)
    
     res.render('wallet-history', {
         historyDocs: historyDocs
    })
    } catch{
        res.send("Error")
    }
 }
  


exports.delete = async function(req, res){
    let money = new Money()
    await money.deleteHistoryDoc(req.body.DeletionId)
    res.redirect('/wallet-history')
}