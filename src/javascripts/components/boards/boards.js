import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boards';
import util from '../../helpers/utilities';
// import pins from '../singleBoard/singleBoard';

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
        domString += '<div class="card" style="width: 18rem;">';
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title text-center">${board.name}</h5>`;
        domString += '</div></div>';
        util.printToDom('allBoards', domString);
      });
    })

    .catch((error) => console.error(error));
};

export default { boardMaker, buildAllBoards };
