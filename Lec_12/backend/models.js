const mongoose= require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/bonkbot")
.then(function() {
    console.log("Connected to database");
    
})
.catch(function(err) {
    console.log("Error connecting to database",err);
})

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    privateKey: String,
    publicKey: String
})

const userModel = mongoose.model("users", UserSchema);

module.exports = {
    userModel
}