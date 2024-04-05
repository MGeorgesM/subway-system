import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const BranchInvitationForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/send-email', { branch_email: email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        document.body.classList.add('display-user-active');
        return () => {
            document.body.classList.remove('display-user-active');
        };
    }, []);

    return (
        <div className="admin-panel-right">
            <div className="branch-invitation-main">
                <div className="branch-invitation-form">
                    <h2>Send Branch Invitation</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Branch Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Invitation'}
                        </button>
                        {message && (
                            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BranchInvitationForm;
