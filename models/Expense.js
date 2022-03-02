const expenseCollection = require('../db').collection("expenses");
const ObjectID = require('mongodb').ObjectID
const Money = require('./Money')

let Expense= function(data){
    this.data = data
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
        authorId : new ObjectID("621193e385a43bb20bb9449a"),

    }
}
    Expense.prototype.saveExpense = async function(){
        this.cleanUp()
        await expenseCollection.insertOne(this.data) 
    }

    Expense.prototype.getExpenses = async function(){
        // this.cleanUp()
        let authorId = new ObjectID("621193e385a43bb20bb9449a")

        let expenses = await expenseCollection.find({authorId: authorId})
        return expenses
    }

    Expense.prototype.paid = async function(paidId){
        console.log(paidId)
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
    console.log(editId)
    console.log(updatedData.amountSpent)
    try{
   let oldExpense = await expenseCollection.findOneAndUpdate({_id: new ObjectID(editId)}, {$set: {amount: Number(updatedData.amountSpent), item: updatedData.item, purchaseDate: new Date(updatedData.purchaseDate), notes: updatedData.notes, expType: updatedData.personalExp }})
   
return oldExpense    
}
catch{
    console.log("failed")    

}
}
    module.exports = Expense