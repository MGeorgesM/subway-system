import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';

import './index.css';
// import LocationForm from './Forms/LocationForm';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    // const navigate = useNavigate();

    useEffect(() => {
        if (!formData.email.includes('@') && formData.email.length > 0) {
            setError('Invalid email');
        } else if (formData.password.length < 8 && formData.password.length > 0) {
            setError('Password must be at least 8 characters');
        } else {
            setError([]);
        }
    }, [formData]);

    const switchHandler = (isLogin) => {
        setError([]);
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);

        try {
            const response = await sendRequest(requestMethods.POST, '/auth/login', data);
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                // navigate('/')
                return;
            } else {
                throw new Error('Wrong ');
            }
        } catch (error) {
            console.log(error.message);
            // setError([error.message]);
        }
    };

    const handleSignup = (formData) => {
        console.log('form data', formData);

        // const data = new FormData();
        // data.append('email', formData.email);
        // data.append('password', formData.password);
        // data.append('name', formData.name);
        // data.append('isCompany', formData.isCompany);

        // try {
        //     const response = await axios.post('/users/signup.php', data);
        //     if (response.data.status === 'success') {
        //         localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        //         // navigate('/')
        //         return;
        //     } else {
        //         throw new Error(response.data.message);
        //     }
        // } catch (error) {
        //     console.log(error.message);
        //     setError([error.message]);
        // }
    };

    return (
        <section className="form-component flex center">
            {isLogin ? (
                <SignInForm switchHandler={switchHandler} handleLogin={handleLogin} error={error} />
            ) : (
                <SignUpForm
                    switchHandler={switchHandler}
                    handleSignup={handleSignup}
                    error={error}
                    setFormData={setFormData}
                    formData={formData}
                />
            )}
        </section>
    );
};

export default Authentication;
