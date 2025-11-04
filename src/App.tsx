import { useState, useRef, useEffect} from 'react'
import './App.css'

// logic of the submit button
import { handleClick } from './ButtonLogic'
// EventHandling
import { InputHandling } from './EventHandling'

// MUI
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// UI
import * as UI from './UI'


// libraries so i can add some drag and drop

// FIREBASE :)
import { writeUserData } from './Database'; // database interacting operations
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './credential' // credentials
import { authenticate, initButton} from './Authenticate'


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app); // has yet to be used, although the point is to get some analytical data


function App() {
  const inputRef = useRef(''); // to beam input to the screen (or html)
  const todoRef = useRef(''); // to make sure the todo is always scrolled to bottom
  
  const [todo, setTodo] = useState([]); // beam the data to the variable 'todo', which in turn beam to the html
  const [todoPressed, setTodoPressed] = useState(-1); // state for whether a todo line is pressed or not

  const [current_id, set_cid] = useState(-1);

  const [hideSignIn, setHideSignIn] = useState('');
  const [hideSignOut, setHideSignOut] = useState('hidden');

  // 3 colors buttons
  // button for deleting
  

  

  // check if you are signed in or not. if yes, set current_id, and hide the one tap, show the sign out button. vice versa otherwise.
  useEffect(() => authenticate(app, setTodo, set_cid, setHideSignIn, setHideSignOut),[]);

  //initialize google authentication and create sign-in button
  useEffect(() => {
    initButton(app, setTodo, set_cid, setHideSignIn, setHideSignOut, current_id);  
  }, [current_id]);

  
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
      writeUserData(current_id, todo);
    }
  }, [todo]);

  

  // event handling for pressing enter on keyboard
  useEffect(() => {
    InputHandling(inputRef, setTodoPressed, setTodo);
  }, [handleClick]); 

  // html UI, enough said
  return (
    <>
    <UI.Todo 
      todoRef={todoRef} 
      todo={todo} setTodo={setTodo} 
      setTodoPressed={setTodoPressed} todoPressed={todoPressed} 
      current_id={current_id}
    />
    <UI.SignInOut 
      hideSignIn={hideSignIn} hideSignOut={hideSignOut} 
      setHideSignIn={setHideSignIn} setHideSignOut={setHideSignOut} 
      set_cid={set_cid} 
    />

    <div className="flex fixed left-1 bottom-2 right-1 h-[8.2dvh]" >
      <input ref={inputRef} type="text" 
        className="w-full h-full 
        text-[#D6FFD8] 
        border-2 border-[#D6FFD8] rounded-md bg-transparent px-2 box-border outline-none focus:border-[#D6FFD8]"/>
      <Button variant="contained" onClick={() => handleClick(inputRef, setTodo)} className="">
        <PlayArrowIcon />
      </Button>
    </div>
    </>
  )
}

export default App
