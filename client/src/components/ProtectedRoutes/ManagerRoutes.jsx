import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { useEffect } from 'react';

const ManagerRoutes = ({ children }) => {
    const navigate = useNavigate();

    const validate = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/getuserrole');
            if (response.data.role === 2) {
                console.log('User is Manager');
                return;
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
};

export default ManagerRoutes;
