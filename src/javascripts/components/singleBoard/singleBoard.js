import $ from 'jquery';
import pinData from '../../helpers/data/pins';
import util from '../../helpers/utilities';

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
        <button class="btn btn-danger deleteThisPin" dataBoardId="${pin.boardId}" id="${pin.id}" >Delete this pin</button>
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

export default { singleBoard, createPinOnClick };
