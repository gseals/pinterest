import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';
import util from '../utilities';

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
      console.log('boards before resolve', boards.length);
      if (boards.length === 0) {
        console.log('boards within print function', boards.length);
        let domString = '<h1>Boards</h1>';
        domString += '<button class="btn btn-dark hideWhenOnPin" data-toggle="modal" data-target="#buildBoardModal">Add a board</button>';
        domString += '<div id="allBoards" class="d-flex flex-wrap justify-content-between container">';
        domString += '<h2>There are no boards here. Consider making one.</h2>';
        domString += '</div>';
        util.printToDom('boards', domString);
      } else {
        console.log('boards once resolved', boards.length);
        resolve(boards);
        console.log('boards resolved', boards.length);
      }
    })
    .catch((error) => reject(error));
});

const deleteBoardData = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const createBoardData = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default { getBoardByUser, deleteBoardData, createBoardData };
