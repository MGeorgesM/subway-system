import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";

import SignInForm from "./Forms/SignInForm";
import SignUpForm from "./Forms/SignUpForm";

import "./index.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.email.includes("@") && formData.email.length > 0) {
      setError("Invalid email");
    } else if (formData.password.length < 8 && formData.password.length > 0) {
      setError("Password must be at least 8 characters");
    } else {
      setError("");
    }
  }, [formData]);

  const switchHandler = (isLogin) => {
    setIsLogin(isLogin);
  };

  const handleLogin = async (formData) => {
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                const getuser = await sendRequest(requestMethods.GET, '/users/get', null);
                if (getuser.status === 200) {
                    console.log(getuser.data)
                    localStorage.setItem('location', JSON.stringify([parseFloat(getuser.data.user.lat), parseFloat(getuser.data.user.lng)]));
                }
                navigate('/browse');
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            setError('Wrong email or password');
        }
    };

    const handleSignup = async (formData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/register', formData);
            if (response.status === 201) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/location');
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="form-component flex center">
            <div className="container box-shadow border-radius flex center column">
                <div className="logo-form">
                    <img src="./images/Assets/logo-dark-grey.png" alt="logo" />
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
