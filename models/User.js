const usersCollection = require('../db').db().collection("users")
const validator = require('validator')
const md5 = require('md5')
const bcrypt = require("bcryptjs")

let User = function(data){
    this.data = data
    this.errors = []
}



User.prototype.validate = function(){
    return new Promise(async (resolve, reject) => {
        if (this.data.username==""){this.errors.push("You Must provide username.")}
        
        if (this.data.password==""){this.errors.push("You Must provide a password.")}
        if((this.data.password.length>0) && (this.data.password.lenth<7)){this.errors.push("Password should atleast be of 12 characters")}
        if(this.data.password.length>50){this.errors.push("Passwords cannot excess 50 characters")}
        if(this.data.username.length>0 && this.data.username.lenth<3){this.errors.push("Username should atleast be of 3 characters")}
        if(this.data.username.length>30){this.errors.push("Username cannot excess 30 characters")}
                            //npm install validator
        if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Usernames can only contain letters and Number")}
        if (!validator.isEmail(this.data.email)){this.errors.push("You Must provide a valid email Address.")}
    //only if username is valid, then check to see if it's already taken.
    if(this.data.username.length>0 && this.data.username.length<31 &&validator.isAlphanumeric(this.data.username)){
        let usernameExists = await usersCollection.findOne({username: this.data.username})
        if(usernameExists){
            this.errors.push("That username is already taken")
        }
    }



//only if email is valid, then check to see if it's already taken.
if(validator.isEmail(this.data.email)){
    let emailExists = await usersCollection.findOne({email: this.data.email})
    if(emailExists){
        this.errors.push("That Email is already taken")
    }
}
resolve()
})
}



User.prototype.cleanUp = function(){
    if(typeof(this.data.username) != "string") {this.data.username = ""}
    if(typeof(this.data.email) != "string") {this.data.email = ""}
    if(typeof(this.data.password) != "string") {this.data.password = ""}

    //Get rid of any bogus properties
this.data = {
    _id: this.data._id,
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
}}


User.prototype.register = function(){
    return new Promise(async (resolve, reject)=> {
        //Step #1: Validate User data
        this.cleanUp()
       await this.validate() //This points towards whatver is calling the function. in this case, the user in usercontroller is going to call.
        //Step #2: Only if there are no validation errors, Then save the user data into a database
     if(!this.errors.length){
         //hash user password
         this.data.password = bcrypt.hashSync(this.data.password)
         //a is the value we want to hash. B is our salt value
        await usersCollection.insertOne(this.data)
        // this.getAvatar()
         resolve()
     }
     else{
        reject(this.errors)
     }
    })
}

User.prototype.login = function(){
    this.cleanUp()
    
    // usersCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
    //     if(attemptedUser && attemptedUser.password == this.data.password){

    //     } else{
    //         console.log("Invalid")

    //     }
    // })

    return new Promise((resolve, reject)=>{
  usersCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
        if(attemptedUser &&bcrypt.compareSync(this.data.password, attemptedUser.password)){
            this.data = attemptedUser
            resolve();
        } else{
            reject()
        }
    })
    })
}

module.exports = User
