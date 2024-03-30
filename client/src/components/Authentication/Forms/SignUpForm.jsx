import { React, useState } from 'react';

const SignupForm = ({ switchHandler, handleSignup, validationError, apiError }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        isCompany: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };
    return (
        <div className="container box-shadow off-white-bg border flex center column">
            <div className="logo">
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <form className="flex center column" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" placeholder="user@mail.com" required onChange={handleChange} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="name" required onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="password" required onChange={handleChange} />
                </div>
                <div className="company-check flex center">
                    <label>Are you a company?</label>
                    <input
                        type="checkbox"
                        name="isCompany"
                        checked={formData.isCompany}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className="flex center validation-display">
                    {apiError.length > 0 && apiError.map((error, index) => <p key={index}>{error}</p>)}
                </div>
                <button className="register-btn primary-bg white-text box-shadow" type="submit">
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
