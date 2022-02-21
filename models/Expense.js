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
        purchaseDate: this.data.purchaseDate,
        notes: this.data.note,
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

        let expenses = await expenseCollection.find({authorId: authorId}, {$sort:{item: -1}}).toArray()
        return expenses
    }
    module.exports = Expense