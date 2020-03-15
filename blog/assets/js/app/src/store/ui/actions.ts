import { EReduxActionTypes, IReduxBaseAction } from 'store';


export interface IReduxToggleEditActive extends IReduxBaseAction {
  type: EReduxActionTypes.TOGGLE_EDIT_ACTIVE;
}

export function toggleEditActive(): IReduxToggleEditActive {
  return {
    type: EReduxActionTypes.TOGGLE_EDIT_ACTIVE
  }
}
