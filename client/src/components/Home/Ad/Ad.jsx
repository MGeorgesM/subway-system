const Ad = ({ count, avgRating, name }) => {
    return (
        <div className="ad flex center center dark-text">
            <div className={`ad-img ${count === 1 && 'hidden'}`}>
                <img src="./images/assets/station.jpeg" alt="ad" className="border-radius" />
            </div>
            <div className="ad-text flex column">
                <h1>{count === 1 ? 'Your Nearest Station' : 'Our Most Popular'}</h1>
                <h2>
                    {name} | {avgRating && avgRating}
                </h2>
                <p>
                    {count === 1
                        ? 'Conveniently located amidst bustling streets and vibrant neighborhoods, our nearest station offers unparalleled accessibility to commuters on the go. Situated just steps away from count landmarks and popular destinations, it serves as a gateway to the pulse of the city.'
                        : "Our highest rated station, nestled in the heart of the city, epitomizes convenience and efficiency. Boasting state-of-the-art facilities and impeccable cleanliness, it's a beacon of modern transit."}
                </p>
            </div>
            <div className={`ad-img ${count === 2 && 'hidden'}`}>
                <img src="./images/assets/station.jpeg" alt="ad" className="border-radius" />
            </div>
        </div>
    );
};
export default Ad;
