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
    FORGOT_PASSWORD_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_RESET,
    CLEAR_ERRORS,
} from "../constants/userConstants";

//login and register reducer --> You cannot make mor than one reducer just to update user
export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return { loading: true, isAuthenticated: false }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return { loading: false, isAuthenticated: true, user: action.payload }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        case LOAD_USER_FAIL:
            return { loading: false, isAuthenticated: false, error: action.payload }
        case LOGOUT_SUCCESS:
            return { loading: false, isAuthenticated: false, user: null }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}

//profileReducer

//update profile and password reducer
export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return { loading: true, ...state, isUpdated: false }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return { loading: false, isUpdated: action.payload }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload, isUpdated: false }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state
    }
}

//forgot password reducer
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return { loading: true, ...state }
        case FORGOT_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload } //this will give message that email is sent to your gmail account
        case RESET_PASSWORD_SUCCESS:
            return { loading: false, success: action.payload }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:

            return { loading: false, error: action.payload }
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                message: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}

//reset password reducer