import Map from '../Map/Map';
import Ad from './Ad/Ad';
import Loading from '../Elements/Loading/Loading';
import { useHomeLogic } from './logic';

import './index.css';

const Home = () => {
    const { nearestStation, topStation, showWelcome, search, stations, userLocation, setShowWelcome, setSearch } =
        useHomeLogic();

    return (
        <>
            {!nearestStation ? (
                <Loading />
            ) : (
                <>
                    <div className="main white-bg flex column">
                        {showWelcome && (
                            <div className="welcome-home">
                                <h2>Step Into</h2>
                                <h1>The World of Onwards</h1>
                            </div>
                        )}
                        <Map
                            locationTextInput={search}
                            markersInput={stations}
                            userLocationProp={userLocation}
                            setShowWelcome={setShowWelcome}
                        ></Map>
                        <div className="home-search">
                            <input
                                className="input-btn-lg border-dark border-radius-l off-white-bg-trsp"
                                type="text"
                                placeholder="Search for available stations..."
                                onKeyUp={(e) => e.key === 'Enter' && setSearch(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="recommendations white-bg">
                        <div className="text">
                            <h1 className="bold">Recommended Stations</h1>
                            <h2>Discover top picks for your journey ahead</h2>
                        </div>
                    </div>
                    <div className="stations flex center"></div>
                    <div className="ads flex column center white-bg">
                        <Ad
                            type={1}
                            avgRating={nearestStation.rating}
                            name={nearestStation.name}
                            stationId={nearestStation.id}
                        />
                        <Ad type={0} avgRating={topStation.rating} name={topStation.name} stationId={topStation.id} />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
