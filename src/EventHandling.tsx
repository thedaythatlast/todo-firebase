import {handleClick} from './ButtonLogic' 

  const detectKeyBoardButton = (e, inputRef, setTodo) => { 
      // ignore metakeys (like ctrl)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") handleClick(inputRef, setTodo); // submit button when pressed 'enter'
      else if (e.key.length === 1) inputRef.current.focus(); // input field focused when press any key at all
    };

  const detectMouseButton = (e, setTodoPressed) => { 
    if (e.target.closest('button')) return;
    setTodoPressed(-1);
  };

  export function InputHandling(inputRef, setTodoPressed, setTodo) {
    window.addEventListener("keydown", (event) => detectKeyBoardButton(event, inputRef, setTodo));
    window.addEventListener("mousedown", (event) => detectMouseButton(event, setTodoPressed));

    return () => {
      window.removeEventListener("keydown", (event) => detectKeyBoardButton(event, inputRef, setTodo));
      window.removeEventListener("mousedown", (event) => detectMouseButton(event, setTodoPressed));     
    }
  }