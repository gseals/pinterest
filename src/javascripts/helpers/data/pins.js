import axios from 'axios';
import apiKeys from '../apiKeys.json';
import util from '../utilities';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardID = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      if (demPins === {}) {
        const newString = 'There are no pins to display!';
        util.printToDom('singleBoard', newString);
      } if (demPins !== {}) {
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

const deletePinsData = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPinsByBoardID, deletePinsData };
