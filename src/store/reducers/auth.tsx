import { ActionTypes } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: '',
  userId: '',
  error: false,
  loading: false,
  authRedirectPath: '/'
};

interface authState {
  token: string;
  userId: string;
  error: boolean;
  loading: boolean;
  authRedirectPath: string;
}

interface authAction {
  error?: {
    code: number;
    message: string;
    errors: [{ domain: string; message: string; reason: string }];
  };
  idToken?: string;
  userId?: string;
  type: string;
  path?: string;
}

const authStart = (state: authState, action: { type: string }) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: authState, action: authAction) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authFail = (state: authState, action: authAction) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state: authState, action: authAction) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: authState, action: authAction) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action: authAction) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return authStart(state, action);
    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case ActionTypes.AUTH_FAIL:
      return authFail(state, action);
    case ActionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case ActionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
