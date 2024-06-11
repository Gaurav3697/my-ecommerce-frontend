import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

//login and register reducer
export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return { loading: true, isAuthenticated: false }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:

            return { loading: false, isAuthenticated: true, user: action.payload }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// load user reducer
export const loadUserReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return { loading: true, ...state}
        case LOAD_USER_SUCCESS:
            return { loading: false, isAuthenticated: true, user: action.payload }
        case LOAD_USER_FAIL:
            return { loading: false, isAuthenticated: false, error: action.payload }
        default:
            return state
    }
}

//logout reducer
export const logoutReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return { loading: false, isAuthenticated: false, user: null }
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//update profile and password reducer
export const updateReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return { loading: true, ...state  }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//forgot password reducer
export const forgotPasswordReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { loading: true, ...state }
        case FORGOT_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload } //this will give message that email is sent to your gmail account
        case FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//reset password reducer