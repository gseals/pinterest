import $ from 'jquery';
import 'firebase/auth';
import boards from '../boards/boards';

const returnToBoards = () => {
  $('body').on('click', '#returnToBoards', () => {
    document.getElementById('singleBoard').innerHTML = '';
    document.getElementById('footer').innerHTML = '';
    document.getElementById('top').innerHTML = '';
    boards.buildAllBoards();
    $('.hideWhenOnPin').removeClass('hide');
    $('#board').removeClass('hide');
  });
};

export default { returnToBoards };
