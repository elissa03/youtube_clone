var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	fullname: String,
	email: String,
	password: String,
	passwordConf: String
}),
module.exports = mongoose.model("users", userSchema);