// import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boards';
import util from '../../helpers/utilities';
import pins from '../singleBoard/singleBoard';

const boardMaker = () => {
  let domString = '<h1>Boards</h1>';
  domString += '<div id="allBoards" class="d-flex flex-wrap justify-content-between container"></div>';
  util.printToDom('board', domString);
};

const buildAllBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUser(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `
        <div class="card" style="width: 18rem;">
        <img src="${board.imageUrl}" class="card-img-top img-fluid board-image" alt="...">
        <div class="card-body">
        <h5 class="card-title board-name text-center">${board.name}</h5>
        <p>${board.descriptions}</p>
        <button class="btn btn-primary">Do anything</button>
        </div></div>`;
        util.printToDom('allBoards', domString);
      });
    })

    .catch((error) => console.error(error));
};

const pinGrab = () => {
  $('body').on('click', 'button', pins.singleBoard);
};

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

export default { boardMaker, buildAllBoards, pinGrab };
