import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pins';
import boardsData from '../../helpers/data/boards';
import util from '../../helpers/utilities';
import pinS from '../singleBoard/singleBoard';

const boardMaker = () => {
  let domString = '<h1>Boards</h1>';
  domString += '<button class="btn btn-dark hideWhenOnPin" data-toggle="modal" data-target="#buildBoardModal">Add a board</button>';
  domString += '<div id="allBoards" class="d-flex flex-wrap justify-content-between container"></div>';
  util.printToDom('board', domString);
};

const deleteBoardOnClick = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const boardId = $(e.target).attr('id').split('kill--')[1];
  console.log(boardId);
  boardsData.deleteBoardData(boardId)
    .then(() => {
      const { uid } = firebase.auth().currentUser;
      // eslint-disable-next-line no-use-before-define
      buildAllBoards(uid);
      pinData.getPinsByBoardID(boardId).then((pins) => {
        pins.forEach((pin) => pinData.deletePinsData(pin.id));
      });
    })
    .catch((error) => console.error(error));
};

const buildAllBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUser(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `
        <div class="card" id="disappear" style="width: 18rem;">
        <img src="${board.imageUrl}" class="card-img-top img-fluid board-image" alt="...">
        <div class="card-body">
        <h5 class="card-title board-name text-center">${board.name}</h5>
        <p>${board.descriptions}</p>
        <button class="btn btn-primary testClick" id="${board.id}">Go to board</button>
        <button class="btn btn-danger deleteBoardByBoardId" id="kill--${board.id}">Delete this board</button>
        </div></div>`;
        util.printToDom('allBoards', domString);
      });
    })

    .catch((error) => console.error(error));
  $('body').on('click', '.deleteBoardByBoardId', (e) => deleteBoardOnClick(e));
};

const pinGrab = () => {
  $('body').on('click', '.testClick', (e) => {
    const boardClickId = $(e.target).attr('id');
    pinS.singleBoard(boardClickId);
    document.getElementById('allBoards').innerHTML = '';
    $('.hideWhenOnPin').addClass('hide');
  });
};

const createBoardOnClick = () => {
  $('body').on('click', '#saveNewBoard', (e) => {
    e.stopImmediatePropagation();
    const { uid } = firebase.auth().currentUser;
    const newBoard = {
      name: $('#nameOfBoard').val(),
      imageUrl: $('#imageUrl').val(),
      descriptions: $('#description').val(),
      isPrivate: true,
      uid,
    };
    boardsData.createBoardData(newBoard)
      .then(() => {
        $('#buildBoardModal').modal('hide');
        buildAllBoards();
        $('#nameOfBoard').val('');
        $('#imageUrl').val('');
        $('#description').val('');
      })
      .catch((error) => console.error(error));
  });
};

export default {
  boardMaker,
  buildAllBoards,
  pinGrab,
  createBoardOnClick,
};
