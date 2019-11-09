import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/myNavbar';
import home from './components/home/home';
import board from './components/boards/boards';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  myNavbar.logoutEvent();
  home.homeMaker();
  board.boardMaker();
};

init();
