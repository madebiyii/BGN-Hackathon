import axios from "axios";

export const validateAddress = async (address) => {
  try {
    const val = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: process.env.NEXT_PUBLIC_MAP_KEY,
        },
      },
    );

    if (val.data.status === "OK" && val.data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating address:", error);
  }
};

export const getAddress = async (lat, lon) => {
  const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
  const res = await axios.get(url);
  const data = await res.data;
  if (data.status === "OK" && data?.results.length > 0) {
    return data.results[0].formatted_address;
  } else {
    return "Please try again";
  }
};
