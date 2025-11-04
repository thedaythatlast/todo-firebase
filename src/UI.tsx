import './App.css'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { log_out } from './Authenticate'
import { deleteUserData } from './Database';

export const Todo = ({todoRef, todo, setTodo, setTodoPressed, current_id, todoPressed}) => {
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
		        key={item.id} onClick={() => setTodoPressed(item.id)}
		        tabIndex={0}>
		        - {item.text}

		        {todoPressed == item.id ? LineButton(item.id, todo, setTodo, setTodoPressed, current_id, "text-[#D6FFD8]") : null}
		      </div>
		      ))
		    }
		    </div>
		</>
	);
};

export const LineButton = (TargetID, todo, setTodo, setTodoPressed, current_id, colorVarDefault) => (
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

export const SignInOut = ({hideSignIn, hideSignOut, set_cid, setHideSignIn, setHideSignOut}) => {
  return (
  <>
    <div id="sign-in" className={`fixed top-1 right-1 ${hideSignIn}`}></div> 
      <div className={`fixed top-1 right-1 ${hideSignOut}`}>
        <Button variant="contained" onClick={() => log_out(set_cid, setHideSignIn, setHideSignOut)}>Sign-out</Button>
      </div>
  </>
  );
};