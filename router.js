const express= require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const moneyController = require('./controllers/moneyController.js')
const expenseController = require('./controllers/expenseController')

router.get('/', userController.home)
router.post('/add-money', moneyController.addMoney, moneyController.checkBalance)
router.post('/add-expense', expenseController.saveExpense)
// router.get('/bal', moneyController.checkBalance)

module.exports=router