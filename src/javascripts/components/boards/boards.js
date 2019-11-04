import util from '../../helpers/utilities';
// import pins from '../singleBoard/singleBoard';

const boardMaker = () => {
  const domString = '<h1>Boards</h1>';
  util.printToDom('board', domString);
};

export default { boardMaker };
