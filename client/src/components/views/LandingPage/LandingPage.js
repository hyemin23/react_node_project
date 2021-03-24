import React from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";

function LandingPage(props) {

    // useEffect(() => {
    //     axios.get("http://localhost:5011/api/test").then((data) => {
    //         console.log(data);
    //     });

    // }, []);


    //로그아웃
    const onClick = (e) => {
        e.preventDefault();

        // axios.post("http://localhost:5014/api/users/logout").then(res => {
        //     if (res.data.success) {
        //         alert("로그아웃되었습니다.");
        //         props.history.push("/");

        //     } else {
        //         alert("실패");
        //         return false;
        //     }
        // });

        axios.get(`http://localhost:5014/api/users/logout`)
            .then(response => {
                console.log(response);

                if (response.data.success) {
                    props.history.push("/login")
                } else {

                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })

    }

    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center"
            , width: "100%", height: "100vh"
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClick}>
                로그아웃
            </button>
        </div>

    )
}

export default withRouter(LandingPage);
