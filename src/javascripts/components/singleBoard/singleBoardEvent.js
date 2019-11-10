import $ from 'jquery';
import 'firebase/auth';

// import pinData from '../../helpers/data/pins';

import boards from '../boards/boards';
// import singleBoard from './singleBoard';

const returnToBoards = () => {
  $('body').on('click', '#returnToBoards', () => {
    document.getElementById('singleBoard').innerHTML = '';
    document.getElementById('footer').innerHTML = '';
    boards.buildAllBoards();
    $('.hideWhenOnPin').removeClass('hide');
  });
};

// const deletePinOnClick = () => {
//   $('body').on('click', '.deleteThisPin', (e) => {
//     // e.preventDefault();
//     // const { uid } = firebase.auth().currentUser;
//     const pinId = e.target.id;
//     console.log(pinId);
//     pinData.deletePinsData(pinId);
//   });
// };

// const deletePinOnClick = (e) => {
//   e.preventDefault();
//   $('body').on('click', '.deleteThisPin', (event) => {
//     // const { uid } = firebase.auth().currentUser;
//     const pinId = $(event.target).attr('id');
//     console.log(pinId);
//     pinData.deletePinsData(pinId)
//       .then(() => {
//         const boardClickId = $(e.target).attr('dataBoardId');
//         singleBoard.singleBoard(boardClickId);
//       })
//       .catch((error) => console.error(error));
//   });
// };

export default { returnToBoards };
