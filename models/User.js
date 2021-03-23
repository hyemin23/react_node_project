const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
//비밀번호 10자리 이상
const saltRounds = 10;

const jwt = require("jsonwebtoken");

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

//메소드를 만들 수 있음
userSchema.methods.comparePassword = function (plainPassword, cb) {

    //암호화 전 비번과 암호화된 db비번 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        //에러가 있으면 cb함수에 err 넣기
        if (err) return cb(err);

        //에러가 없으면 cb함수에 err = null, isMatch(boolean) 넣기
        cb(null, isMatch);
    })
}

//토큰 만드는 메서드 추가
//cb는 = function(err,user) 를 의미
userSchema.methods.makeToken = function (cb) {

    var user = this;

    //json-webtoken을 이용해서 토큰 생성
    //순수 Object로 변환 후 보내야하므로 toHexString()사용
    //user._id : mogodb에 있는 id 값을 의미.
    //user._id + 'sercretToken' = token 생성이됨
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    //만들어진 token을 user token에 저장
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);

        //cb = function(err,user)의미 따라서 null,성공한user정보를 보냄
        cb(null, user);

    });
}


//model에 User 스키마 추가
const User = mongoose.model('User', userSchema);
//User 스키마 export.
module.exports = { User }