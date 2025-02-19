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
  updateListsError: '',

  isUpdatingCard: false,
  isUpdatingCardSuccess: false,
  updateCardError: ''
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
  }),
  on(listActions.updateCard, (state, {type, previousList, list, boardId}) => {
    console.log(type)
    console.log(previousList)
    console.log(list)
    return {
      ...state,
      isUpdatingLists: false,
      isUpdatingCard: true,
      isUpdatingCardSuccess: false,
      updateCardError: ''
    };
  }),
  on(listActions.updateCardSuccess, (state, {list, type}) => {
    console.log(type)
    console.log(list)
    return {
      ...state,
      isUpdatingCardSuccess: true,
      isUpdatingCard: false,
    };
  }),
  on(listActions.updateCardFailure, (state, {error, type}) => {
    return {
      ...state,
      isUpdatingCard: false,
      isUpdatingCardSuccess: false,
      updateCardError: error
    };
  }),
)
