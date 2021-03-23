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


//token과 callback함수를 매개변수로 받는 익명의 함수
//https://www.inflearn.com/questions/30860 
//methods와 statics의 차이점
userSchema.statics.findByToken = function (token, cb) {

    //arrow function은 var user = this 안적어도 됨 전역객체 참조하므로
    var user = this;
    //토큰을 decode 한다
    //json web token 홈페이지를 참조
    //토큰을 생성했 을 때 넣어줬던 "secretToken"을 2번째 인자로 넣어줌
    //decoded : 디코드된 user_.id가 나옴 ( secretToken )을 제외한

    jwt.verify(token, 'secretToken', function (err, decode) {

        user.findOne({
            "_id": decode
            , "token": token
        }, function (err, user) {
            console.log(user);
            if (err) return cb(err);
            return cb(null, user);
        });
    });

    //디코드전 토큰와 디코드 된 후 user_.id 와 일치하는 user 찾기
    // user.findOne({
    //     "_id": decoded
    //     , "token": token
    // }, function (err, user) {
    //     console.log("err user", err, user);
    //     if (err) return cb(err);

    //     //찾은 user 전달
    //     cb(null, user)
    // });


}


//model에 User 스키마 추가
const User = mongoose.model('User', userSchema);
//User 스키마 export.
module.exports = { User }