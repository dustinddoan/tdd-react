import React from "react";

const SignUpPage = () => {
    return (
        <div>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Username"/>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="Email"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password"/>
            <label htmlFor="password-repeat">Password Repeat</label>
            <input id="password-repeat" type="password" placeholder="Password"/>
            <button disabled>Sign Up</button>
        </div>
    )
}

export default SignUpPage;