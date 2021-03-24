const { User } = require("../models/User");

//인증 처리를 하는 곳
let authMiddleWare = (req, res, next) => {

    //1. client cookie에서 token을 (x_auth라고 넣음) 가져온다 -> cookie parser 이용
    let token = req.cookies.x_auth;

    //2. 가져온 토큰을 복호화한 후 user를 찾는다
    //findByToken() 메서드 생성
    User.findByToken(token, function (err, findUser) {

        //토큰이 일치하는지 검증
        if (err) throw err;
        if (!findUser) return res.json({ isAuth: false, error: true })


        //모든 검증이 끝나고 토큰이 일치하면 requset에 token과 인증된 user를 넣어줌
        //그럼 index.js에서 req 값으로 꺼내 사용 가능
        req.token = token;
        req.user = findUser;

        //미들웨어 종료
        next();
    });


    //3. user저가 있으면 인증 ( o ) 없으면 ( x )
}

module.exports = { authMiddleWare };