import { useState, useRef, useEffect} from 'react'
import './App.css'
import { firebaseConfig, CLIENT_ID } from './credential.tsx'

// MUI

import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

// libraries so i can add some drag and drop

// FIREBASE :)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged  } from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // has yet to be used, although the point is to get some analytical data


function Field() {
  const inputRef = useRef(''); // to beam input to the screen (or html)
  const todoRef = useRef(''); // to make sure the todo is always scrolled to bottom
  
  const [todo, setTodo] = useState([]); // beam the data to the variable 'todo', which in turn beam to the html
  const [todoPressed, setTodoPressed] = useState(-1); // state for whether a todo line is pressed or not
  const colorVarDefault = "text-[#D6FFD8]"; // default color for each submitted text

  const [current_id, set_cid] = useState(-1);

  const [hideSignIn, setHideSignIn] = useState('');
  const [hideSignOut, setHideSignOut] = useState('hidden');

  // 3 colors buttons
  // button for deleting
  const LineButton = (TargetID) => (
    <div className="absolute content-center bottom-[100%] z-1">
      <div className="flex gap-1">
        <Button
          variant="contained" 
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: colorVarDefault } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }}
        > 
        Green
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: 'text-red-500' } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }}
        > 
        Red
        </Button>

        <Button 
          variant="contained" 
          color="warning"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: 'text-yellow-500' } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }} 
        > 
        Golden
        </Button>
        <Button 
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.filter(NewTodo => NewTodo.id !== TargetID));
            const index = todo.findIndex(todo => todo.id === TargetID);
            deleteUserData(current_id, index);
            setTodoPressed(-1);
          }}
          aria-label="delete" color="info"
        > 
          <DeleteIcon />
          Delete
        </Button>
      </div>
    </div>
  );

  

  // check if you are signed in or not. if yes, set current_id, and hide the one tap, show the sign out button. vice versa otherwise.
  useEffect(() => {
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
      readUserData(user.uid);
    } else {
      console.log("No user signed in");
      set_cid(-1);
      setHideSignIn('');
      setHideSignOut('hidden');
    }
  });

  return () => unsubscribe();
  },[]);
  
  // --- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ---

  // beam data to the screen whenver the button clicked
  const handleClick = () => {
    if (inputRef.current?.value === "") return;
    setTodo((prev) => [...prev, {id: Date.now(), color: colorVarDefault, text: inputRef.current?.value}]);
  };

  // firebase authenticator

  
  useEffect(() => {
    if (window.google && current_id === -1) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
      
      const container = document.getElementById("sign-in");
      if (container) {
        window.google.accounts.id.renderButton(
          container,
          { theme: "outline", size: "large" }
        );
      }
    }  
  }, [current_id]);

  // database writing and reading
  const writeUserData = (userId) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      todo : todo
    });
  }
  const deleteUserData = (userId, index) => {
    const db = getDatabase();
    set(ref(db, `users/${userId}/todo/${index}/`), null);
  }
  const readUserData = (userId) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setTodo(snapshot.val().todo);
    } else {
      console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
  });}

  // authenticate, then get email
  const handleCredentialResponse = (response) => {
    setHideSignIn('hidden');
    setHideSignOut('');

    const auth = getAuth();
    const googleCredential = GoogleAuthProvider.credential(response.credential);

    signInWithCredential(auth, googleCredential)
    .then((result) => {
      const user = result.user;     
      set_cid(user.uid);
      //readUserData(user.uid);
    })
    .catch((error) => {
      // Handle errors
      console.error("Firebase Sign-In Error:", error);
    });
  };

  // sign out
  const log_out = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      console.log('Sign-out successful.')
    }).catch((error) => {
      console.error(error)
    });

    set_cid(-1);
    setHideSignIn('');
    setHideSignOut('hidden');
  };
  

  // scroll bottom + clean input when enter (whenveer something added to todo)
  // also save data to localstorage
  useEffect(() => {
    // scroll bottom whenever a new thing added
    if (todoRef.current) {
      todoRef.current.scrollTop = todoRef.current.scrollHeight;
      inputRef.current.value = "";
    } 

    // save data to localstorage whenever a new thing added
    localStorage.setItem('todo', JSON.stringify(todo));
    if (current_id != -1) {
      writeUserData(current_id);
    }
  }, [todo]);

  const LinePressed = (id_of_line) => {
      setTodoPressed(id_of_line);
    };

  // event handling for pressing enter on keyboard
  useEffect(() => {
    const detectKeyBoardButton = (e) => { 
      // ignore metakeys (like ctrl)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") handleClick(); // submit button when pressed 'enter'
      else if (e.key.length === 1) inputRef.current.focus(); // input field focused when press any key at all
    };

    const detectMouseButton = (e) => { 
      if (e.target.closest('button')) return;
      setTodoPressed(-1);
    };

    window.addEventListener("keydown", detectKeyBoardButton);
    window.addEventListener("mousedown", detectMouseButton);
    return () => {
      window.removeEventListener("keydown", detectKeyBoardButton);
      window.removeEventListener("mousedown", detectMouseButton);     
    }
  }, [handleClick]); 

  // html UI, enough said
  return (
    <>
    <div className="fixed top-1 left-1 text-left h-[90dvh] overflow-y-auto w-[100%] text-[28px]" ref={todoRef}>
    TODO:
    { 
      todo.map((item) => (
      <div 
        className={`relative flex items-start ${item.color}
        wrap-anywhere text-pretty
        hover:bg-[#414D62] focus:bg-[#414D62] active:shadow-inner
        text-[24px]
        `} 
        key={item.id} onClick={() => LinePressed(item.id)}
        tabIndex={0}>
        - {item.text}

        {todoPressed == item.id ? LineButton(item.id) : null}
      </div>
      ))
    }
    </div>
    <div id="sign-in" className={`fixed top-1 right-1 ${hideSignIn}`}></div> 
    <div className={`fixed top-1 right-1 ${hideSignOut}`}>
      <Button variant="contained" onClick={log_out}>Sign-out</Button>
    </div>

    <div className="flex fixed left-1 bottom-2 right-1 h-[8.2dvh]" >
      <input ref={inputRef} type="text" 
        className="w-full h-full 
        text-[#D6FFD8] 
        border-2 border-[#D6FFD8] rounded-md bg-transparent px-2 box-border outline-none focus:border-[#D6FFD8]"/>
      <Button variant="contained" onClick={handleClick} className="">
        <PlayArrowIcon />
      </Button>
    </div>
    </>
  )
}

function App() {

  return (
    <>
    <div>
      <Field />
    </div>
    </>
  )
}

export default App
