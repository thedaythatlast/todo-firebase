import { getDatabase, ref, set, get, child } from "firebase/database";
  

// database writing and reading
  export const writeUserData = (userId, todo) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      todo : todo
    });
  };

  export const deleteUserData = (userId, index) => {
    const db = getDatabase();
    set(ref(db, `users/${userId}/todo/${index}/`), null);
  };

  export const readUserData = (userId, setTodo) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setTodo(snapshot.val().todo);
    } else {
      console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
  });};