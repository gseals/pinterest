import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/myNavbar';
import home from './components/home/home';
import board from './components/boards/boards';
// import singleBoard from './components/singleBoard/singleBoard';
// import pinsData from './helpers/data/pins';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  myNavbar.logoutEvent();
  home.homeMaker();
  board.boardMaker();
  // singleBoard.singleBoard();
  board.pinGrab();
  // pinsData.getPinsByBoardID();
};

init();
