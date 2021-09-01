export const addTodo = (state, item) => {
    state.todoList.push(item);
}

export const removeTodo = (state, index) => {
    state.todoList.splice(index, 1);
}

export const toogle = (state, index) => {
    state.todoList[index].done = ! state.todoList[index].done;
}

