const express= require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const moneyController = require('./controllers/moneyController.js')
const expenseController = require('./controllers/expenseController')

router.get('/', userController.home)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/logout', userController.logout)

//temp
// router.get('/home', userController.homeMain)


// router.get('/', userController.home)
router.post('/add-money', moneyController.addMoney, moneyController.checkBalance)
router.post('/add-expense', expenseController.saveExpense)
// router.get('/bal', moneyController.checkBalance)
router.post('/paid', expenseController.paid )
router.get('/all-expenses', expenseController.showAllExpenses)
router.get('/payment-history', expenseController.completeExpenseHistory)
router.get('/wallet-history', moneyController.completeWalletHistory) 
router.post('/delete', expenseController.delete)
router.post('/delete-wallet-history', moneyController.delete)

router.get('/edit/:id', expenseController.edit)
router.post('/edit-expense/:id', expenseController.actuallyEdit)

module.exports=router
