export const defaultLocation = [33.88863, 35.49548];

export const getUserLocation = () => {
    const storedLocation = JSON.parse(localStorage.getItem('location'));
    const userLocation = storedLocation && storedLocation.length > 0 ? storedLocation : defaultLocation;
    return userLocation;
};
