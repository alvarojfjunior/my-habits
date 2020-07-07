const INITIAL_STATE = {
    user: {},
}
export default function user(state = INITIAL_STATE, action) {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user,
        }
    }
    return state;
}