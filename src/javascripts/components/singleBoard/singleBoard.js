// const allPinsOnBoard = () => {
//   $('body').on('click', '.card', () => {

//   });
// };
import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boards';

const consoleBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUser(uid)
    .then((boards) => console.error(boards))
    .catch((error) => console.error(error));
};

export default { consoleBoards };

// const singleBoardMaker = (position) => {
//   let domString = '';
//   if (position.pins.name) {
//     domString += `
//     <div class="card col-4">
//   <img src=${position.pins.imageUrl} alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${position.pins.name}</h5>
//     <p class="card-text">$${position.pins.description}</p>
//     <p class="card-text">${position.siteUrl}</p>
//   </div>
// </div>`;
//   } else {
//     domString += `
//     <div class="card col-4">
//   <div class="card-body">
//     <p class="card-text">EMPTY</p>
//     <p class="card-text">${position.position}</p>
//   </div>
// </div>`;
//   }

//   return domString;
// };

// export default { singleBoardMaker };
