import pinData from '../../helpers/data/pins';
import util from '../../helpers/utilities';

const singleBoard = (boardId) => {
  pinData.getPinsByBoardID(boardId)
    .then((pins) => {
      console.log(pins);
      let domString = '';
      pins.forEach((pin) => {
        domString += `
        <div class="card" style="width: 18rem;">
        <img src="${pin.imageUrl}" class="card-img-top img-fluid board-image" alt="...">
        <div class="card-body">
        <h5 class="card-title pin-name text-center">${pin.name}</h5>
        <p>${pin.description}</p>
        </div></div>`;
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
};

export default { singleBoard };
