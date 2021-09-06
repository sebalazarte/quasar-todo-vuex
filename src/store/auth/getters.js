export const currentState = (state) => {

    return state.status;
}

export const username = (state) => {

    return state.user?.name || '';
}

export const userEmail = (state) => {

    return state.user?.email || '';
}