export const SIGN_UP = 'SIGN_UP';
export const signUpAction = user => {
    return {
        type: SIGN_UP,
        payload: { user }
    };
};

export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const signUpErrorAction = errs => {
    return {
        type: SIGN_UP_ERROR,
        payload: { errs }
    };
};

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (user) => {
    return {
        type: SIGN_IN,
        payload: { user }
    };
};

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfileAction = (user) => {
    return {
        type: UPDATE_PROFILE,
        payload: { user }
    };
};

export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const updateBudgetAction = budget => {
    return {
        type: UPDATE_BUDGET,
        payload: budget
    }
};

export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const updateProfileErrorAction = (errs) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload: { errs }
    };
};

export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const signInErrorAction = (errs) => {
    return {
        type: SIGN_IN_ERROR,
        payload: { errs }
    };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
    return { type: SIGN_OUT };
};