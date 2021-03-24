import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get("http://localhost:5011/api/test").then((data) => {
            console.log(data);
        });

    }, []);
    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center"
            , width: "100%", height: "100vh"
        }}>
            <h2>시작 페이지</h2>

            <button>
                로그아웃
            </button>
        </div>

    )
}

export default LandingPage
