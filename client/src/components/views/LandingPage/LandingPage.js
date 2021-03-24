import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get("http://localhost:5010/api/test").then((data) => {
            console.log(data);
        });

    }, []);
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
