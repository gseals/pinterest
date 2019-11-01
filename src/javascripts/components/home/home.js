import util from '../../helpers/utilities';

const homeMaker = () => {
  const domString = '<h1>PINTEREST</h1>';
  util.printToDom('home', domString);
};

export default { homeMaker };
