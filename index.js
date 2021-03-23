const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const { User } = require("./models/User");
const config = require("./config/key");


/* body parser를 이용 */
//application/x-www-form-urlencoded 로 된 부분을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 부분을 분석해서 가져올 수 있게해줌
app.use(bodyParser.json());


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

    //user.save() => user model에 저장시킴.
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })

        //성공시 res 응답에 json형식으로 성공을 보냄
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


