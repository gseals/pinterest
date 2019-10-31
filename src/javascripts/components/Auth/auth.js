import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/utilities';
import monkeyButt from './googlebutton.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="google-auth" class ="btn btn-danger">
  <img src="${monkeyButt}" />
  </button>`;
  util.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
