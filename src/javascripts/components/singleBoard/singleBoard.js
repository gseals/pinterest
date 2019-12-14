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
  <h1>Pins</h1>
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
        <button class="btn btn-info editPins" boardUpdate="${pin.boardId}" pinId="${pin.id}" id="update-${pin.id}">Update Pin</button>
        <button class="btn btn-danger deleteThisPin" dataBoardId="${pin.boardId}" id="${pin.id}">Delete Pin</button>
        </div>
        </div>`;
        util.printToDom('singleBoard', domString);
      });
    })
    .catch((error) => {
      const domString = `
      <div class="text-center">
      <h1>${error.message}</h1>
      </div>`;
      util.printToDom('singleBoard', domString);
      console.error(error);
    });
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
  pinData.getPinToUpdate(pinId)
    .then((response) => {
      const info = response.data;
      $('#updatedNameOfPin').val(info.name);
      $('#updatedPinImageUrl').val(info.imageUrl);
      $('#boardsSwap').val(info.boardId);
      $('#updatedDescriptionOfPin').val(info.description);
      $('#updateSiteUrl').val(info.siteUrl);
    });
  $('#updatePinToBoard').modal('show');
  $('#updatePinToBoard').find('.modal-footer').attr('id', pinId);
  $('#updatePinToBoard').find('.modal-footer').attr('boardid', boardId);
  boardOptions();
});

const updatePinOnClick = (e, boardId) => {
  e.stopImmediatePropagation();
  const pinId = e.target.parentNode.id;
  const updatedPin = {
    name: $('#updatedNameOfPin').val(),
    imageUrl: $('#updatedPinImageUrl').val(),
    description: $('#updatedDescriptionOfPin').val(),
    boardId: $('#boardsSwap').val(),
    siteUrl: $('#updateSiteUrl').val(),
  };
  pinData.updatePins(pinId, updatedPin)
    .then(() => {
      singleBoard(boardId);
    })
    .catch((error) => console.error(error));
};

$('body').on('click', '#saveUpdatedPin', (e) => {
  const boardId = $(e.target).parent().attr('boardid');
  updatePinOnClick(e, boardId);
  $('#updatePinToBoard').modal('hide');
});

$('body').on('click', '#navbar-button-logout', () => {
  $('#singleBoard').html('');
  $('#top').html('');
  $('#footer').html('');
});

export default { singleBoard, createPinOnClick };
