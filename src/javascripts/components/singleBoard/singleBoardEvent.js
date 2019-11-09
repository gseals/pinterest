import $ from 'jquery';
import boards from '../boards/boards';

const returnToBoards = () => {
  $('body').on('click', '#returnToBoards', () => {
    document.getElementById('singleBoard').innerHTML = '';
    document.getElementById('footer').innerHTML = '';
    boards.buildAllBoards();
  });
};

export default { returnToBoards };
