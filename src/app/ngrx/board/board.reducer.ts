import {BoardState} from './board.state';
import {createReducer, on} from '@ngrx/store';
import * as boardActions from './board.actions';

const initialState: BoardState = {
  board: null,
  isGettingBoard: false,
  isGettingBoardSuccess: false,
  getBoardError: ''
};

export const boardReducer = createReducer(
  initialState,
  on(boardActions.getBoard, (state) => {
    return {
      ...state,
      isGettingBoard: true,
      isGettingBoardSuccess: false,
      getBoardError: ''
    };
  }),
  on(boardActions.getBoardSuccess, (state, {board}) => {
    return {
      ...state,
      board,
      isGettingBoard: false,
      isGettingBoardSuccess: true,
      getBoardError: ''
    };
  }),
  on(boardActions.getBoardFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isGettingBoard: false,
      isGettingBoardSuccess: false,
      getBoardError: errorMessage
    };
  })
)
