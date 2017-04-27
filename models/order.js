var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true}//gía trị token dc cung cấp bởi stripe cho mỗi giao dịch thanh công
});

module.exports = mongoose.model("Orders", schema);