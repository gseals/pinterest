import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardID = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      if ($.isEmptyObject(demPins)) {
        reject(new Error('There are no pins to display!'));
      } else {
        const pins = [];
        Object.keys(demPins).forEach((pinId) => {
          demPins[pinId].id = pinId;
          pins.push(demPins[pinId]);
        });
        resolve(pins);
      }
    })
    .catch((error) => reject(error));
});

const getPinToUpdate = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePinsData = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const createPinData = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePins = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

export default {
  getPinsByBoardID,
  deletePinsData,
  createPinData,
  updatePins,
  getPinToUpdate,
};
