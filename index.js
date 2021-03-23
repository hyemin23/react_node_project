const express = require('express');
const app = express();
const port = 5006;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const { User } = require("./models/User");
const config = require("./config/key");

const cookieParser = require("cookie-parser");


/* body parser를 이용 */
//application/x-www-form-urlencoded 로 된 부분을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 부분을 분석해서 가져올 수 있게해줌
app.use(bodyParser.json());
//쿠키 파서 사용 명시
app.use(cookieParser());

//몽고 DB 연결 부분
//config.mongoURI로 가져온다.
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true
    , useUnifiedTopology: true
    , useCreateIndex: true
    , useFindAndModify: false
}).then(() => console.log("몽고디비 연결 상태입니다!")).catch(err => console.log(err))



app.get("/", (req, res) => res.send("node mon 적용"));

//회원가입
app.post("/register", (req, res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져요면 그것들을 데이터 베이스에 넣어준다.
    //req.body => body parser 를 이용해서 받음
    const user = new User(req.body);

    //user.save() => user model에 저장시킴. 그 전에 pre()를 탐
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })

        //성공시 res 응답에 json형식으로 성공을 보냄
        return res.status(200).json({
            success: true
        })
    })

})

//로그인
app.post("/login", (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾기
    User.findOne({ email: req.body.email }, (err, user) => {

        // 이메일이 없는 경우
        if (!user) {
            return res.json({
                loginSuccess: false
                , message: "해당하는 유저가 없습니다."
            });
        }

        //몽고디비 사용자 메서드 생성
        //요청된 이메일이 db에 있다면 password가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).send(err);

            //비밀번호가 없으면
            if (!isMatch) {
                return res.json({
                    loginSuccess: false
                    , message: "비밀번호가 맞지 않습니다."
                });
            }

            //몽고 디비 메서드 토큰 만드는 메서드 생성 .비밀번호가 맞다면 토큰을 생성하기.
            user.makeToken((err, user) => {
                //에러가 있다면 client에게 전달
                if (err) {
                    return res.status(400).send(err);
                }

                //쿠키 or localStorage or Session 에 토큰 저장
                //쿠키에 저장하려면 라이브러리 필요
                //"x_auth"라는 이름으로 쿠키 생성
                //쿠키 저장이 성공시
                res.cookie("x_auth", user.token).status(200).json({
                    loginSuccess: true
                    , userId: user._id
                });
            });

        });

    });


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


