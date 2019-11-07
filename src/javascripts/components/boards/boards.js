import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boards';
import util from '../../helpers/utilities';
// import pins from '../singleBoard/singleBoard';

const boardMaker = () => {
  const domString = '<h1>Boards</h1>';
  util.printToDom('board', domString);
};

const buildAllBoards = () => {
  const uid = firebase.auth().currentUser;
  boardsData.getBoardByUser(uid)
    .then((boards) => console.error(boards))
    .catch((error) => console.error(error));
};

export default { boardMaker, buildAllBoards };
