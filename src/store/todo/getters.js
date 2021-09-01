/*
export function someGetter (state) {
}
*/

export const all = (state) => {
    return state.todoList;
}

export const completed = (state) => {
    return state.todoList.find(i => i.done);
}

export const pending = (state) => {
    return state.todoList.find(i => !i.done);
}