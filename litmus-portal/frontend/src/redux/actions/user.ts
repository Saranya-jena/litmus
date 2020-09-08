import { UserAction, UserActions } from '../../models/redux/user';

export function setUserDetails(jwt: string): UserAction {
  return {
    type: UserActions.LOAD_USER_DETAILS,
    payload: jwt,
  };
}

export function updateUserDetails(selectedProjectID: string): UserAction {
  return {
    type: UserActions.UPDATE_USER_DETAILS,
    payload: selectedProjectID,
  };
}

export function userLogout(): UserAction {
  return {
    type: UserActions.LOGOUT_USER,
    payload: '',
  };
}
