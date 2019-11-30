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
  // $('#disappear').html('');
  // const { uid } = firebase.auth().currentUser;
  const boardId = $(e.target).attr('id').split('kill--')[1];
  console.log(boardId);
  boardsData.deleteBoardData(boardId)
  // pinData.getAllPinsByBoardId(boardId)
  // $('#boardClickId').hide()
    .then(() => {
      const { uid } = firebase.auth().currentUser;
      // eslint-disable-next-line no-use-before-define
      buildAllBoards(uid);
      // e.preventDefault();
      // e.stopImmediatePropagation();
      pinData.getPinsByBoardID(boardId).then((pins) => {
        pins.forEach((pin) => pinData.deletePinsData(pin.id));
      });

      // const boardClickId = $(e.target).attr('dataBoardId');
      // // eslint-disable-next-line no-use-before-define
      // singleBoard(boardClickId);
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
    // console.log(boardClickId);
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

// const pinGrab = () => {
//   $('body').on('click', '.testClick', (e) => {
//     const boardClickId = $(e.target).attr('id');
//     pins.singleBoard(boardClickId);
//     document.getElementById('allBoards').innerHTML = '';
//     console.log(boardClickId);
//   });
// };
// NOTE: this click event rocks. put it in notes

// const event = () => {
//   $('.board-image').hide();
//   $('.card').on('mouseenter mouseleave', (e) => {
//     const eventB = $(e.target);
//     eventB.find('.board-image').fadeToggle(500);
//     eventB.find('.board-name').hide();
//   });
//   $('.card').mouseleave(() => {
//     $('.board-name').fadeIn(900);
//   });
// };

export default {
  boardMaker,
  buildAllBoards,
  pinGrab,
  createBoardOnClick,
};
