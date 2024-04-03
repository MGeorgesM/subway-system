import { useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { useEffect } from 'react';

const PassengerRoutes = ({ children }) => {
    const navigate = useNavigate();

    const validate = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/get');

        } catch (error) {
            navigate('/auth', { replace: true });
            console.log('Error validating user:', error.response.data.message);
        }
    };

    useEffect(() => {
        validate();
    }, []);
    
    return children;
};

export default PassengerRoutes;
