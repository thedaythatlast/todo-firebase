import './App.css'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteUserData } from './Database';

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