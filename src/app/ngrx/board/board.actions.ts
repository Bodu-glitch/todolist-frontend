import {createAction, props} from '@ngrx/store';
import {Board} from './board.state';

export const getBoard = createAction('[Board] Get Board Actions', props<{ boardId: string }>());
export const getBoardSuccess = createAction('[Board] Get Board Actions Success', props<{ board: Board }>());
export const getBoardFailure = createAction('[Board] Get Board Actions Failure', props<{
  errorMessage: string
}>());
