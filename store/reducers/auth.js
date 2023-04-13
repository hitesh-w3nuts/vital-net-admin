import { LOGIN_USER, LOGOUT_USER } from "./../actionType"

const initialState = {
    login : false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return state = { ...state, login: true }
        case LOGOUT_USER:
            return state = { ...state, login: false }
        default:
            return state = { ...state }
    }
}

export default auth;