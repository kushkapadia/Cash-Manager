const expenseCollection = require('../db').db().collection("expenses");
const ObjectID = require('mongodb').ObjectID
const Money = require('./Money')

let Expense= function(data, userId){
    this.data = data,
    this.authorId = new ObjectID(userId)
    this.errors =[]
    }

Expense.prototype.cleanUp = function(){
    this.data ={
        amount: Number(this.data.amountSpent),
        item: this.data.item,
        purchaseDate: new Date(this.data.purchaseDate),
        notes: this.data.notes,
        status: false,
        expType: this.data.personalExp,
        authorId : this.authorId,

    }
}
    Expense.prototype.saveExpense = async function(){
        this.cleanUp()
        await expenseCollection.insertOne(this.data) 
    }

    Expense.prototype.getExpenses = async function(userId){
        // this.cleanUp()
        let authorId = new ObjectID(userId)
        let expenses = await expenseCollection.find({authorId: authorId})
      
        return (await expenses.sort({purchaseDate: -1}).toArray()).filter((item)=>{
            return item.status ==false
        }).slice(0, 3)
    }


Expense.prototype.getAllExpenses = async function(userId){
    let authorId = new ObjectID(userId)
        let expenses = await expenseCollection.find({authorId: authorId})
      
        return (await expenses.sort({purchaseDate: -1}).toArray()).filter((item)=>{
            return item.status == false
        })
    
}

Expense.prototype.getFullExpenses = async function(userId){
    let authorId = new ObjectID(userId)
        let expenses = await expenseCollection.find({authorId: authorId})

    
        return  expenses.sort({purchaseDate: -1}).toArray()
        
}

    Expense.prototype.paid = async function(paidId){
        let updatedDoc = await expenseCollection.findOneAndUpdate({_id: ObjectID(paidId)}, {$set: {status: true}})
        //    console.log("updated")
 
         return updatedDoc.value.amount
       
    }

  Expense.delete = async function(deletionId){
await expenseCollection.deleteOne({_id: new ObjectID(deletionId)})
}

Expense.findSingleById = async function(id){

   let expense = await expenseCollection.findOne({_id: new ObjectID(id)})
   return expense
}

Expense.edit = async function(editId, updatedData){
    try{
   let oldExpense = await expenseCollection.findOneAndUpdate({_id: new ObjectID(editId)}, {$set: {amount: Number(updatedData.amountSpent), item: updatedData.item, purchaseDate: new Date(updatedData.purchaseDate), notes: updatedData.notes, expType: updatedData.personalExp }})
   
return oldExpense    
}
catch{
    console.log("failed")    

}
}
    module.exports = Expense