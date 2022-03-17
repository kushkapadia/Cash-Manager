 const moneyCollection = require('../db').db().collection("money");
const ObjectID = require('mongodb').ObjectID

let Money = function(data, userId){
this.data = data
this.authorId = new ObjectID(userId)
this.errors =[]
}

Money.prototype.cleanUp =function(){
    this.data = {
        balance :  Number(this.data.balance),
        AddDate: new Date(),
        authorId : this.authorId,
    }
}
Money.prototype.cleanUpExtra =function(){
    this.data = {
       
        AddDate: new Date(),
        // authorId : this.authorId
    
    }
}

Money.prototype.addMoney = async function(userId){
   this.cleanUp()
   
  
    let checkIfWalletAvailable = await moneyCollection.findOne({authorId: new ObjectID(userId)})
    if(checkIfWalletAvailable){
        let curBalance =  await (await moneyCollection.find({authorId: new ObjectID(userId)})).toArray()
        newBalance =  Number(curBalance[0].balance + this.data.balance)
        moneyCollection.findOneAndUpdate({authorId: new ObjectID(userId)}, {$set: {balance: newBalance}})
    } else{
 await moneyCollection.insertOne(this.data)
}
}

Money.prototype.checkBalance = async function(userId){
    let curBalance = await moneyCollection.find({authorId: new ObjectID(userId) }).toArray()
    return  curBalance
}



Money.prototype.subtractBal = async function(amountSpent, userId){
    this.cleanUpExtra()

    let checkIfWalletAvailable = await moneyCollection.findOne({authorId: new ObjectID(userId)})
    if(checkIfWalletAvailable){
        let curBalance =  await (await moneyCollection.find({authorId:  new ObjectID(userId)})).toArray()
        newBalance =  Number(curBalance[0].balance - amountSpent)
       await moneyCollection.findOneAndUpdate({authorId:  new ObjectID(userId)}, {$set: {balance: newBalance}})
    } 
    else{
        console.log("Failed")
    }
}

Money.prototype.addBalance = async function(amountReturned, userId){
    this.cleanUpExtra()

    // let checkIfWalletAvailable = await moneyCollection.findOne({authorId: this.data.authorId})
    
        let curBalance =  await (await moneyCollection.find({authorId: new ObjectID(userId)})).toArray()
        newBalance =  Number(curBalance[0].balance + amountReturned)
       await moneyCollection.findOneAndUpdate({authorId: new ObjectID(userId)}, {$set: {balance: newBalance}})
    
    
}


module.exports = Money
