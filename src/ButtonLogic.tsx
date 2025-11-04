export const handleClick = (inputRef, setTodo) => {
    if (inputRef.current?.value === "") return;
    setTodo((prev) => [...prev, {id: Date.now(), color: "text-[#D6FFD8]", text: inputRef.current?.value}]);
  };