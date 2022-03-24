import initialState from '../store/initialState';
import * as Actions from './actions';

export const UserReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.SIGN_UP:
            return {
                ...state,
                ...action.payload.user,
            }
        case Actions.SIGN_UP_ERROR:
            return {
                ...state,
                errors: action.payload.errs,
            }
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload.user,
            }
        case Actions.SIGN_IN_ERROR:
            return {
                ...state,
                errors: action.payload.errs,
            }
        case Actions.SIGN_OUT:
            return {
                errors: {
                    email: null,
                    password: null
                }
            }
        case Actions.UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload.user,
            }
        case Actions.UPDATE_BUDGET:
            return {
                ...state,
                budget: action.payload.budget
            }
            
        default:
            return state;
    }
}
