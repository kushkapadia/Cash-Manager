const expenseCollection = require('../db').collection("expenses");
const ObjectID = require('mongodb').ObjectID


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
           console.log("updated")
        //   let updatedDoc= await expenseCollection.find({_id:ObjectID(paidId)}).toArray()
           // let updatedDoc = await moneyCollection.findOne({_id: paidId})
        //    console.log("This is the doc returned by findone and update " + upd)
         return updatedDoc.value.amount
       
    }
    module.exports = Expense