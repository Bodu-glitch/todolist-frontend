import {ListState} from './list.state';
import {createReducer, on} from '@ngrx/store';
import * as listActions from './list.actions';

const initialState: ListState = {
  lists: [],
  isGettingLists: false,
  isGettingListsSuccess: false,
  getListsError: '',

  isUpdatingLists: false,
  isUpdatingListsSuccess: false,
  updateListsError: ''
};

export const listReducer = createReducer(
  initialState,
  on(listActions.updatePosition, (state, {type, list, boardId}) => {
    console.log(type)
    return {
      ...state,
      isUpdatingLists: true,
      isUpdatingListsSuccess: false,
      updateListsError: ''
    };
  }),
  on(listActions.updatePositionSuccess, (state, {list, type}) => {
    console.log(type)
    console.log(list)
    return {
      ...state,
      lists: list,
      isUpdatingLists: false,
      isUpdatingListsSuccess: true,
      updateListsError: ''
    };
  }),
  on(listActions.updatePositionFailure, (state, {error, type}) => {
    return {
      ...state,
      isUpdatingLists: false,
      isUpdatingListsSuccess: false,
      updateListsError: error
    };
  })
)
