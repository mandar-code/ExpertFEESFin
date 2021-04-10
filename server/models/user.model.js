const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');


var userSchema = new mongoose.Schema({
    studentId:{type:Number,default:0, unique:true},
    userid:{type: String,required: 'User Id name can\'t be empty',unique:true},
    mobileNo: {type: String,required: 'Full name can\'t be empty',unique:true},
    email: {type: String,required: 'Email can\'t be empty',unique: true},
    password: {type: String,required: 'Password can\'t be empty',minlength: [4, 'Password must be atleast 4 character long']},
    admin: { type: Boolean, default: false },
    token: { type: String, trim: true },
    reset_password_token: { type: String, trim: true },
    reset_password_expires: { type: Date },
    updated_at: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    applicationForm: [{ type: Schema.Types.ObjectId, ref: 'ApplicationForm' }],
    saltSecret: String
});


autoIncrement.initialize(mongoose.connection); 
userSchema.plugin(autoIncrement.plugin, {
  model: 'userSchema',
  field: 'studentId',
  startAt: 1,
  incrementBy: +1
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

 

mongoose.model('User', userSchema);

// module.exports = User = mongoose.model('User', userSchema);
    
