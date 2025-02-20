import {createAction, props} from '@ngrx/store';
import {Board} from './board.state';

export const getBoard = createAction('[Board] Get Board Actions', props<{ boardId: string }>());
export const getBoardSuccess = createAction('[Board] Get Board Actions Success', props<{ board: Board }>());
export const getBoardFailure = createAction('[Board] Get Board Actions Failure', props<{
  errorMessage: string
}>());

export const searchBoards = createAction('[Board] Search Boards Actions', props<{ search: string }>());
export const searchBoardsSuccess = createAction('[Board] Search Boards Actions Success', props<{ boards: Board[] }>());
export const searchBoardsFailure = createAction('[Board] Search Boards Actions Failure', props<{
  errorMessage: string
}>());
