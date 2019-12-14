import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import boardsData from './boards';
import boardsComp from '../../components/boards/boards';
import singleData from './pins';

const authDiv = $('#auth');
const logoutNavbar = $('#navbar-button-logout');
const homeDiv = $('#home');
const boardsDiv = $('#board');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user, boardId) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      boardsData.getBoardByUser(user.uid);
      boardsComp.buildAllBoards(user.uid);
      singleData.getPinsByBoardID(boardId);
    } else {
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
