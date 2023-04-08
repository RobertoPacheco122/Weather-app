const success = (position) => {
  const { latitude, longitude } = position.coords;
  const coords = `${latitude}, ${longitude}`;
  const searchInput = document.querySelector("#location");
  const event = new Event("change");

  searchInput.value = coords;
  searchInput.dispatchEvent(event);
};

const error = (error) => {
  console.log(error.code, error.message);
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const getUerLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
};

export default getUerLocation;
