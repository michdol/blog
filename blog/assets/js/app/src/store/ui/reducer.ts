import { EReduxActionTypes } from 'store';
import { IReduxToggleEditActive } from './actions';


export interface IReduxUIState {
  editActive: boolean;
}

const initialState: IReduxUIState = {
  editActive: false
};

type TUIReducerActions = IReduxToggleEditActive;

export default function(state: IReduxUIState = initialState, action: TUIReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.TOGGLE_EDIT_ACTIVE:
      return { ...state, editActive: !state.editActive }
    default:
      return state;
  }
}