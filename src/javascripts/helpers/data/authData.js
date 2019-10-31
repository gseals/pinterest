import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const authDiv = $('#auth');
const stockDiv = $('#stock');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      stockDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      stockDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
