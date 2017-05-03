const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required: true}
});
schema.methods.encryptPassword = function(password){
     return bcrypt.hashSync(password);
};

schema.methods.validPassword = function(password) {
    console.log(password);
    console.log(this.password);
    console.log(bcrypt.compareSync(password, this.password));

    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", schema);