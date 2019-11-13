import axios from 'axios';
import apiKeys from '../apiKeys.json';
import util from '../utilities';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardID = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      console.log('response', response.data === {});
      console.log('object.keys', Object.keys.length);
      const demPins = response.data;
      if (demPins === {}) {
        console.log('demPins is an empty object', demPins);
        const newString = 'There are no pins to display!';
        util.printToDom('singleBoard', newString);
      } if (demPins !== {}) {
        console.log('demPins is exists', demPins);
        console.log('object.keys in the second', Object.keys.length);
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
