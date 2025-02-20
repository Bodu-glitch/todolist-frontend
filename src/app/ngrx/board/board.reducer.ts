import {BoardState} from './board.state';
import {createReducer, on} from '@ngrx/store';
import * as boardActions from './board.actions';

const initialState: BoardState = {
  board: null,
  isGettingBoard: false,
  isGettingBoardSuccess: false,
  getBoardError: '',

  searchBoards: [],
  isSearchingBoards: false,
  isSearchingBoardsSuccess: false,
  searchBoardsError: ''
};

export const boardReducer = createReducer(
  initialState,
  on(boardActions.getBoard, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isGettingBoard: true,
      isGettingBoardSuccess: false,
      getBoardError: ''
    };
  }),
  on(boardActions.getBoardSuccess, (state, {board, type}) => {
    console.log(type)
    return {
      ...state,
      board,
      isGettingBoard: false,
      isGettingBoardSuccess: true,
      getBoardError: ''
    };
  }),
  on(boardActions.getBoardFailure, (state, {errorMessage, type}) => {
    console.log(type)
    return {
      ...state,
      isGettingBoard: false,
      isGettingBoardSuccess: false,
      getBoardError: errorMessage
    };
  }),
  on(boardActions.searchBoards, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isSearchingBoards: true,
      isSearchingBoardsSuccess: false,
      searchBoardsError: ''
    };
  }),
  on(boardActions.searchBoardsSuccess, (state, {boards, type}) => {
    console.log(type)
    return {
      ...state,
      searchBoards: boards,
      isSearchingBoards: false,
      isSearchingBoardsSuccess: true,
      searchBoardsError: ''
    };
  }),
  on(boardActions.searchBoardsFailure, (state, {errorMessage, type}) => {
    console.log(type)
    return {
      ...state,
      isSearchingBoards: false,
      isSearchingBoardsSuccess: false,
      searchBoardsError: errorMessage
    };
  })
)
