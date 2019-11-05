import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseUrl;

const getBoard = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((boId) => {
        demBoards[boId].id = boId;
        boards.push(demBoards[boId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

export default { getBoard };
