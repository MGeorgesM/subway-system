import { React, useEffect, useState } from 'react';

const SignupForm = ({ switchHandler, handleSignup, validationError, apiError }) => {
    const [formData, setFormData] = useState({
        fist_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };
    return (
        <div className="container box-shadow light-gray-bg border-radius flex center column">
            <div className="logo">
                <img src="./images/Assets/logo-dark-grey.png" alt="logo" />
            </div>
            <form className="flex column center" onSubmit={handleSubmit}>
                <div>
                    <label className='light-text'>First Name:</label>
                    <input
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='light-text'>Last Name:</label>
                    <input
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="last_name"
                        placeholder="last name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='light-text'>Email:</label>
                    <input
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="email"
                        placeholder="user@mail.com"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='light-text'>Password:</label>
                    <input
                        className="light-gray-bg input-btn-lg border-radius-l border"
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex center validation-display">
                    {apiError.length > 0 && apiError.map((error, index) => <p key={index}>{error}</p>)}
                </div>
                <button className="login-btn input-btn-lg primary-bg white-text box-shadow border-radius-l" type="submit">
                    Register
                </button>
            </form>
            <p>
                Have an Account?{' '}
                <span className="login-link primary-text" onClick={() => switchHandler(true)}>
                    Sign In
                </span>
            </p>
        </div>
    );
};

export default SignupForm;
