import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';

import { useAuthenticationLogic } from './logic';

import './index.css';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const { isLogin, error, formData, setFormData, switchHandler, handleLogin, handleSignup } =
        useAuthenticationLogic();
    const navigate = useNavigate();

    return (
        <div className="form-component flex center">
            <div className="container box-shadow border-radius flex center column">
                <div className="logo-form">
                    <img src="./images/Assets/logo-dark-grey.png" alt="logo" onClick={() => navigate('/browse')} />
                </div>
                {isLogin ? (
                    <SignInForm switchHandler={switchHandler} handleLogin={handleLogin} error={error} />
                ) : (
                    <SignUpForm
                        switchHandler={switchHandler}
                        handleSignup={handleSignup}
                        setFormData={setFormData}
                        formData={formData}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
};

export default Authentication;
