import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pins';
import util from '../../helpers/utilities';
import boardData from '../../helpers/data/boards';

const deletePinOnClick = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const pinId = $(e.target).attr('id');
  console.log(pinId);
  pinData.deletePinsData(pinId)
    .then(() => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const boardClickId = $(e.target).attr('dataBoardId');
      // eslint-disable-next-line no-use-before-define
      singleBoard(boardClickId);
    })
    .catch((error) => console.error(error));
};

const singleBoard = (boardId) => {
  const topString = `
  <button class="btn btn-info boardIdClass" id="${boardId}" data-toggle="modal" data-target="#buildPinModal">Add a pin</button>
  `;
  util.printToDom('top', topString);
  pinData.getPinsByBoardID(boardId)
    .then((pins) => {
      let domString = '';
      pins.forEach((pin) => {
        domString += `
        <div class="card" style="width: 18rem;">
        <img src="${pin.imageUrl}" class="card-img-top img-fluid board-image" alt="...">
        <div class="card-body">
        <h5 class="card-title pin-name text-center">${pin.name}</h5>
        <p>${pin.description}</p>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn btn-info editPins" boardUpdate="${pin.boardId}" pinId="${pin.id}" data-toggle="modal" data-target="#updatePinToBoard" id="update-${pin.id}">Update Pin</button>
        <button class="btn btn-danger deleteThisPin" dataBoardId="${pin.boardId}" id="${pin.id}">Delete Pin</button>
        </div>
        </div>`;
        util.printToDom('singleBoard', domString);
      });
    })
    .catch((error) => console.error(error));
  const nomString = `
    <footer>
    <button class="btn btn-success" id="returnToBoards">Return to boards</button>
    </footer>
    `;
  util.printToDom('footer', nomString);
  $('body').on('click', '.deleteThisPin', (e) => deletePinOnClick(e));
};

const createPinOnClick = () => {
  $('body').on('click', '#saveNewPin', (e) => {
    e.stopImmediatePropagation();
    const newPin = {
      boardId: $('.boardIdClass')[0].id,
      name: $('#nameOfPin').val(),
      imageUrl: $('#pinImageUrl').val(),
      description: $('#descriptionOfPin').val(),
      siteUrl: '',
    };
    pinData.createPinData(newPin)
      .then(() => {
        $('#buildPinModal').modal('hide');
        const boardId = $('.boardIdClass')[0].id;
        singleBoard(boardId);
        $('#nameOfPin').val('');
        $('#pinImageUrl').val('');
        $('#descriptionOfPin').val('');
      })
      .catch((error) => console.error(error));
  });
};

const boardOptions = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoardByUser(uid)
    .then((boards) => {
      let boardString = '';
      boardString += `
        <div>
          <label for="boardsSwap">Choose Board</label>
          <select class="form-control" id="boardsSwap">`;
      boards.forEach((board) => {
        boardString += `<option value="${board.id}">${board.name}</option>`;
      });
      boardString += `
          </select>
        </div>
        `;
      util.printToDom('updatePinBoard', boardString);
    })
    .catch((error) => console.error(error));
};

$('body').on('click', '.editPins', (e) => {
  const boardId = $(e.target).attr('boardUpdate');
  const pinId = $(e.target).attr('pinId');
  pinData.getPinsByBoardID(boardId)
    .then((info) => {
      $('#updatedPinImageUrl').val(info.boardId);
    });
  $('#updatePinToBoard').modal('show');
  $('#updatePinToBoard').find('.modal-footer').attr('id', pinId);
  boardOptions();
});

export default { singleBoard, createPinOnClick };
