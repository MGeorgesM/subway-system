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
        <div className="container box-shadow light-gray-bg border-radius flex center column">
            <div className="logo">
                <img src="./images/Assets/logo-dark-grey.png" alt="logo" />
            </div>
            <form className="flex column" onSubmit={handleSubmit}>
                <div>
                    <label className="light-text">Email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="user@mail.com"
                        onChange={handleChange}
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        required
                    />
                </div>
                <div>
                    <label className="light-text">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        required
                    />
                </div>
                <div className="flex center validation-display">{apiError && <p>{apiError}</p>}</div>
                <button
                    className="login-btn input-btn-lg primary-bg white-text box-shadow border-radius-l"
                    type="submit"
                >
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
