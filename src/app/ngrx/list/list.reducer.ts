import {ListState} from './list.state';
import {createReducer, on} from '@ngrx/store';
import * as listActions from './list.actions';

const initialState: ListState = {
  lists: [],
  isGettingLists: false,
  isGettingListsSuccess: false,
  getListsError: '',

  addListError: '',
  isAddingList: false,
  isAddingListSuccess: false,

  isUpdatingLists: false,
  isUpdatingListsSuccess: false,
  updateListsError: '',

  isUpdatingCard: false,
  isUpdatingCardSuccess: false,
  updateCardError: '',

  isDeletingList: false,
  isDeletingListSuccess: false,
  deleteListError: ''
};

export const listReducer = createReducer(
  initialState,
  on(listActions.addNewList, (state, {type, list, boardId}) => {
    console.log(type)
    return {
      ...state,
      isAddingList: true,
      isAddingListSuccess: false,
      addListError: ''
    };
  }),
  on(listActions.addNewListSuccess, (state, {list}) => {
    return {
      ...state,
      lists: list,
      isAddingList: false,
      isAddingListSuccess: true,
      addListError: ''
    };
  }),
  on(listActions.addNewListFailure, (state, {error}) => {
    return {
      ...state,
      isAddingList: false,
      isAddingListSuccess: false,
      addListError: error
    };
  }),
  on(listActions.storeLists, (state, {lists}) => {
    return {
      ...state,
      lists: lists,
    };
  }),
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
  on(listActions.deleteList, (state, {type, listId}) => {
    console.log(type)
    console.log(state)
    return {
      ...state,
      isDeletingList: true,
      isDeletingListSuccess: false,
      deleteListError: ''
    };
  }),
  on(listActions.deleteListSuccess, (state, {listId, type}) => {
    console.log(type)
    return {
      ...state,
      lists: state.lists.filter(list => list.id !== listId),
      isDeletingList: false,
      isDeletingListSuccess: true,
      deleteListError: ''
    };
  }),
  on(listActions.deleteListFailure, (state, {error, type}) => {
    return {
      ...state,
      isDeletingList: false,
      isDeletingListSuccess: false,
      deleteListError: error
    };
  }),
)
