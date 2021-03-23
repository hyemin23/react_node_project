const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//비밀번호 10자리 이상
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String
        , maxlength: 50
    }
    , email: {
        type: String
        , trim: true
        , unique: 1
    },
    password: {
        type: String
        , minlength: 5
    },
    lastname: {
        type: String
        , maxlength: 50
    }
    , role: {
        type: Number
        , default: 0
    },
    image: String
    , token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//정보를 저장하기 전에 여기를 탐
userSchema.pre('save', function (next) {

    //원본 비밀번호
    //this = userSchema
    let user = this;

    console.log("save");

    //  비밀번호가 변경될때만 bcryt적용
    if (user.isModified('password')) {
        console.log("password 변경")

        //https://www.npmjs.com/package/bcrypt
        //저장 전 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                //해싱된 비밀번호를 user.password에 넣어줌
                user.password = hash;

                //save()하는곳으로 보냄
                next();
            });
        });
    }
    //비밀번호 변경이 아니면 그냥 진행
    else {
        next();
    }
});


const User = mongoose.model('User', userSchema);
module.exports = { User }