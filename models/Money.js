 const moneyCollection = require('../db').db().collection("money");
 const balanceHistoryCollection = require('../db').db().collection("balanceHistory");
const ObjectID = require('mongodb').ObjectID

let Money = function(data, userId){
this.data = data
this.diffData =data
this.authorId = new ObjectID(userId)
this.errors =[]
}

Money.prototype.cleanUp =function(){
    this.data = {
        balance :  Number(this.data.balance),
        AddDate: new Date(),
        authorId : this.authorId,
        //updated 23/5/22
       
    }
}
Money.prototype.cleanUpExtra =function(){
    this.data = {
       
        AddDate: new Date(),
        // authorId : this.authorId
    
    }
}


//Updated 
Money.prototype.cleanUpBalanceHistory = async function(){
    this.diffData = {
        // previouslyAddedMoney: await moneyCollection.findOne({authorId: new ObjectID(this.authorId)}), 
        newAmt: Number(this.diffData.balance),
        // newMoneyAdded:
        balanceNote : this.diffData.balanceNote,
        UpdateDate: new Date(),
        // authorId : this.authorId
    
    }
}



Money.prototype.enterBalanceHistory = async function(userId){
    this.cleanUpBalanceHistory()
    let previouslyAddedMoney = await moneyCollection.findOne({authorId: new ObjectID(this.authorId)})
   // console.log(previouslyAddedMoney)
   await balanceHistoryCollection.insertOne({authorId: new ObjectID(userId) ,previousBalance: previouslyAddedMoney.balance, previousAddDate:  previouslyAddedMoney.AddDate, newAmt: this.diffData.newAmt, newAddDate: this.diffData.UpdateDate, status: "incomplete"})
}


Money.prototype.addMoney = async function(userId){
 

this.enterBalanceHistory(userId)
    this.cleanUp()
   
//   console.log(this.data.balanceNote)

    let checkIfWalletAvailable = await moneyCollection.findOne({authorId: new ObjectID(userId)})
    if(checkIfWalletAvailable){
        let curBalance =  await (await moneyCollection.find({authorId: new ObjectID(userId)})).toArray()
        newBalance =  Number(curBalance[0].balance + this.data.balance)
      await  moneyCollection.findOneAndUpdate({authorId: new ObjectID(userId)}, {$set: {balance: newBalance, AddDate: this.data.AddDate }})
    

 await balanceHistoryCollection.findOneAndUpdate({authorId: new ObjectID(userId), status: "incomplete"}, {$set: {newBalance: newBalance,  note: this.diffData.balanceNote, status: "complete"}})

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



Money.prototype.getWalletHistory = async function(userId){
   let walletHistoryDocs = await balanceHistoryCollection.find({authorId: new ObjectID(userId)}).sort({_id: -1}).toArray()
   return walletHistoryDocs
}

Money.prototype.deleteHistoryDoc = async function (deletionId){
    await balanceHistoryCollection.findOneAndDelete({_id: new ObjectID(deletionId)})
}
module.exports = Money
