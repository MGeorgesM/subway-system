import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';

import './index.css';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [apiError, setApiError] = useState([]);
    // const navigate = useNavigate();

    const switchHandler = (isLogin) => {
        setApiError([]);
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);

        try {
            const response = await sendRequest(requestMethods.POST, '/auth/login', data);
            console.log(response.data)
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                // navigate('/')
                return;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            // setApiError([error.message]);
        }
    };

    const handleSignup = async (formData) => {

        console.log('form data', formData)

        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('name', formData.name);
        data.append('isCompany', formData.isCompany);
        
        try {
            const response = await axios.post('/users/signup.php', data)
            if (response.data.status === 'success') {
                localStorage.setItem('currentUser', JSON.stringify(response.data.data));
                // navigate('/')
                return;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message)
            setApiError([error.message])
        }
    };

    return (
        <section className="form-component white-bg flex center">
            {isLogin ? (
                <SignInForm switchHandler={switchHandler} handleLogin={handleLogin} apiError={apiError} />
            ) : (
                <SignUpForm switchHandler={switchHandler} handleSignup={handleSignup} apiError={apiError} />
            )}
        </section>
    );
};

export default Authentication;
