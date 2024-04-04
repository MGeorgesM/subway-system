import { useNavigate } from "react-router-dom";

import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";
import { useEffect } from "react";

const AdminRoutes = ({ children }) => {
    const navigate = useNavigate();

    const validate = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/get');
            if (response.data.user.role_id === 3) {
                navigate('/admin-panel');
            }
        } catch (error) {
            console.error('Error validating user:', error.response.data.message);
        }
    }
    
    useEffect(() => {
        validate();
    });
    
    return children;
};

export default AdminRoutes;
