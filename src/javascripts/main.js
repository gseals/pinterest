import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/myNavbar';
import home from './components/home/home';
import board from './components/boards/boards';
import singleBoardEvent from './components/singleBoard/singleBoardEvent';
import singleBoard from './components/singleBoard/singleBoard';
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
  board.pinGrab();
  singleBoardEvent.returnToBoards();
  board.createBoardOnClick();
  singleBoard.createPinOnClick();
  boardData.getBoardByUser();
};

init();
