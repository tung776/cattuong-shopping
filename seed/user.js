var mongoose = require('mongoose');
var userModel = require("../models/user");
mongoose.connect('mongodb://localhost/cattuongShopping');

data=[
    {
        email: "thanhtung@gmail.com",
        password: "12345678"
    }
    ];

removeData(CreateData);
function removeData(next) {
    userModel.remove({}, function(err) {
        if(err){
            console.log(err);
        }
        else {
            next();
        }
    });
}
function CreateData() {
    var count = 0;
    for(var i =0; i < data.length; i ++) {
        var newUser = new userModel({
            email: data[i].email
        });
        newUser.password = newUser.encryptPassword(data[i].password);
        newUser.save(function(err, newItem){
            if(err) {
                console.log(err);
                
            }
            else {
                count ++;
                if(count == data.length){
                    mongoose.disconnect();
                }
            }
        });
        
    }
}
