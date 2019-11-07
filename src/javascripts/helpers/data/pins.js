import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebase.databaseURL;

const getPinsByUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

export default { getPinsByUser };
