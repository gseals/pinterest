import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import boards from './boards';
import boardsData from '../../components/boards/boards';

const authDiv = $('#auth');
const stockDiv = $('#stock');
const logoutNavbar = $('#navbar-button-logout');
const homeDiv = $('#home');
const boardsDiv = $('#board');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      stockDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      boards.getBoardByUser(user.uid);
      boardsData.buildAllBoards(user.uid);
    } else {
      stockDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
