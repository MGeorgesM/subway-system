import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { useEffect } from 'react';

const AdminRoutes = ({ children }) => {
    const navigate = useNavigate();

    const validate = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/getuserrole');
            if (response.data.role === 3) {
                console.log('User is an Admin');
                return;
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

export default AdminRoutes;