 const moneyCollection = require('../db').collection("money");
const ObjectID = require('mongodb').ObjectID

let Money = function(data){
this.data = data
this.errors =[]
}

Money.prototype.cleanUp =function(){
    this.data = {
        balance :  Number(this.data.balance),
        AddDate: new Date(),
        authorId : new ObjectID("621193e385a43bb20bb9449a"),
       
    }
}
Money.prototype.cleanUpExtra =function(){
    this.data = {
       
        AddDate: new Date(),
        authorId : new ObjectID("621193e385a43bb20bb9449a"),
       
    }
}

Money.prototype.addMoney = async function(){
   this.cleanUp()
    let checkIfWalletAvailable = await moneyCollection.findOne({authorId: this.data.authorId})
    if(checkIfWalletAvailable){
        let curBalance =  await (await moneyCollection.find({authorId: this.data.authorId})).toArray()
        newBalance =  Number(curBalance[0].balance + this.data.balance)
        console.log(newBalance)
        moneyCollection.findOneAndUpdate({authorId: this.data.authorId}, {$set: {balance: newBalance}})
    } else{
 await moneyCollection.insertOne(this.data)
}
}

Money.prototype.checkBalance = async function(){
    let curBalance = await moneyCollection.find().toArray()
    return  curBalance
}



Money.prototype.subtractBal = async function(amountSpent){
    this.cleanUpExtra()

    let checkIfWalletAvailable = await moneyCollection.findOne({authorId: this.data.authorId})
    if(checkIfWalletAvailable){
        let curBalance =  await (await moneyCollection.find({authorId: this.data.authorId})).toArray()
        newBalance =  Number(curBalance[0].balance - amountSpent)
        console.log(newBalance)
        moneyCollection.findOneAndUpdate({authorId: this.data.authorId}, {$set: {balance: newBalance}})
    } 
    else{
        console.log("Failed")
    }
}
module.exports = Money
