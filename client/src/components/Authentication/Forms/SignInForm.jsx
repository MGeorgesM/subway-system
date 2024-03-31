import { React, useState } from 'react';

import '../index.css';

const SignInForm = ({ switchHandler, handleLogin, apiError }) => {
    const [formdata, setFormData] = useState({});

    const handleSubmit = (e) => {
        handleLogin(formdata);
        e.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container box-shadow off-white-bg border flex center column">
            <div className="logo">
                <img src="./images/Assets/logo-dark-grey.png" alt="logo" />
            </div>
            <form className="flex column" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" placeholder="user@mail.com" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} required/>
                </div>
                <div className="flex center validation-display">
                    {apiError.length > 0 && apiError.map((error, index) => <p key={index}>{error}</p>)}
                </div>
                <button className="login-btn primary-bg white-text box-shadow" type="submit">
                    Login
                </button>
            </form>
            <p>
                No Account?{' '}
                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                    Register Now
                </span>
            </p>
        </div>
    );
};

export default SignInForm;
