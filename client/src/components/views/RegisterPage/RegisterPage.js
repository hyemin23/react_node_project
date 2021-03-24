import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw, setConfirmpw] = useState("");
    const [name, setName] = useState("");

    //dispatch( action ) 을 이용해서 시작 -> reducer -> store 순으로 값 저장

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmpw") {
            setConfirmpw(value);
        } else if (name === "name") {
            setName(value);
        }
    }

    const onSubmit = (e) => {
        console.log("onSubmit");

        e.preventDefault();

        if (password !== confirmpw) {
            return alert("비밀번호가 다릅니다.");
        } else {
            let body = {
                email: email
                , name: name
                , password: password
            }


            //reducer에 있는 success 값이 옴 
            dispatch(registerUser(body)).then((res) => {
                if (res.payload.success) {
                    alert("가입 되셨습니다. 환영합니다!");
                    props.history.push("/login");
                } else {
                    alert("실패");
                    return false;
                }

            });
        }



    }


    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center"
            , width: "100%", height: "100vh"
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmit}
            >


                <label>Email</label>
                <input type="email" onChange={onChange} name="email" vlaue={email} />
                <label>이름</label>
                <input type="text" onChange={onChange} name="name" vlaue={name} />
                <label>비밀번호 입력</label>
                <input type="password" onChange={onChange} name="password" value={password} />

                <label>비밀번호 확인</label>
                <input type="password" onChange={onChange} name="confirmpw" value={confirmpw} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
