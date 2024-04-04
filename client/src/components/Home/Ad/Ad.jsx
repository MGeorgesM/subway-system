import { useNavigate } from 'react-router-dom';

import StarsRating from '../../Elements/StarsRating/StarsRating';

import './index.css';

const Ad = ({ type, avgRating, name, stationId }) => {
    const navigate = useNavigate();

    return (
        <div className="ad flex center center dark-text">
            <div className={`ad-img ${type === 0 && 'hidden'}`}>
                <img src="./images/assets/station.jpeg" alt="ad" className="border-radius" />
            </div>
            <div className="ad-text flex column">
                <h1>{type === 1 ? 'Your Nearest Station' : 'Our Most Popular'}</h1>
                <h2
                    onClick={() => {
                        navigate(`/station?id=${stationId}`);
                    }}
                >
                    {name}
                </h2>
                <h3> {<StarsRating rating={avgRating} className='rating-ad' />}</h3>
                <p>
                    {type === 1
                        ? 'Conveniently located amidst bustling streets and vibrant neighborhoods, our nearest station offers unparalleled accessibility to commuters on the go. Situated just steps away from type landmarks and popular destinations, it serves as a gateway to the pulse of the city.'
                        : "Our highest rated station, nestled in the heart of the city, epitomizes convenience and efficiency. Boasting state-of-the-art facilities and impeccable cleanliness, it's a beacon of modern transit."}
                </p>
            </div>
            <div className={`ad-img ${type === 1 && 'hidden'}`}>
                <img src="./images/assets/station.jpeg" alt="ad" className="border-radius" />
            </div>
        </div>
    );
};
export default Ad;
