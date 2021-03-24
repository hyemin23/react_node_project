
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {

    const dispatch = useDispatch();
    console.log("", dispatch);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //dispatch( action ) 을 이용해서 시작 -> reducer -> store 순으로 값 저장

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    const onSubmit = (e) => {
        console.log("onSubmit");

        e.preventDefault();

        let body = {
            email: email
            , password: password
        }


        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            })


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
                <label>Password</label>
                <input type="password" onChange={onChange} name="password" value={password} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);
