import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardByUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const deleteBoardData = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const createBoardData = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default { getBoardByUser, deleteBoardData, createBoardData };
