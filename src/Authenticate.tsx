import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged  } from "firebase/auth";
import { readUserData } from './Database';
import { CLIENT_ID } from './credential'

// initialize google authentication and create sign-in button
export function initButton(app, setTodo, set_cid, setHideSignIn, setHideSignOut, current_id) {
  if (window.google && current_id === -1) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => handleCredentialResponse(response, app, setTodo, set_cid, setHideSignIn, setHideSignOut),
      });
      
      const container = document.getElementById("sign-in");
      if (container) {
        window.google.accounts.id.renderButton(
          container,
          { theme: "outline", size: "large" }
        );
      }
    }
};

// sign out
export function log_out(set_cid, setHideSignIn, setHideSignOut) {
    const auth = getAuth();

    signOut(auth).then(() => {
      console.log('Sign-out successful.')
    }).catch((error) => {
      console.error(error)
    });

    set_cid(-1); // set current_id
    setHideSignIn(''); // show sign in button
    setHideSignOut('hidden'); // hide sign out button
};

// check if you are signed in or not. if yes, set current_id, and hide the one tap, show the sign out button. vice versa otherwise.
export function authenticate(app, setTodo, set_cid, setHideSignIn, setHideSignOut) {
    // load data to localstorage
    const loadTodo = JSON.parse(localStorage.getItem('todo'));
    if (loadTodo == null) return;
    if (loadTodo.length != 0) setTodo(loadTodo);

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User still signed in");
      set_cid(user.uid);
      setHideSignIn('hidden');
      setHideSignOut('');
      readUserData(user.uid, setTodo);
    } else {
      console.log("No user signed in");
      set_cid(-1);
      setHideSignIn('');
      setHideSignOut('hidden');
    }
  });

  return () => unsubscribe();
};


export function handleCredentialResponse(response, app, setTodo, set_cid, setHideSignIn, setHideSignOut) {
    setHideSignIn('hidden');
    setHideSignOut('');

    const auth = getAuth(app);
    const googleCredential = GoogleAuthProvider.credential(response.credential);

    signInWithCredential(auth, googleCredential)
    .then((result) => {
      const user = result.user;     
      set_cid(user.uid);
    })
    .catch((error) => {
      console.error("Firebase Sign-In Error:", error);
    });
  };