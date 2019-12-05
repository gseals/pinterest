import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
// import boardData from './helpers/data/boards';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/myNavbar';
import home from './components/home/home';
import board from './components/boards/boards';
import singleBoardEvent from './components/singleBoard/singleBoardEvent';
import singleBoard from './components/singleBoard/singleBoard';
// import pinsData from './helpers/data/pins';
import 'bootstrap';
import '../styles/main.scss';
import boardData from './helpers/data/boards';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  myNavbar.logoutEvent();
  home.homeMaker();
  board.boardMaker();
  // singleBoard.singleBoard();
  board.pinGrab();
  // singleBoard.deletePinOnClick();
  // pinsData.getPinsByBoardID();
  singleBoardEvent.returnToBoards();
  // boardData.getBoardByUser();
  board.createBoardOnClick();
  singleBoard.createPinOnClick();
  boardData.getBoardByUser();
};

init();
