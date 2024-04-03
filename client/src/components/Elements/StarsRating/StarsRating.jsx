import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarsRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={solidStar} color="#ED941B" />);
    }
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key="half-star" icon={solidStar} color="#ED941B" half />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={regularStar} color="#6D6B6C" />);
    }

    return <>{stars}</>;
};

export default StarsRating;
