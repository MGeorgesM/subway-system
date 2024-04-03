import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarsRating = ({rating}) => {
    return <FontAwesomeIcon icon={faStar} color="#6D6B6C" />;
};

export default StarsRating;
