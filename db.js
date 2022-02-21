const {MongoClient} = require('mongodb')



    const client = new MongoClient('mongodb+srv://todoAppUser:kk1234567kk@cluster0.6lvjr.mongodb.net/CashManager?retryWrites=true&w=majority')
    
    async function start(){
      await client.connect()
      console.log("Connected")
      module.exports = client.db()
      const app = require('./app')
      app.listen(3000)
    }
    
      start()