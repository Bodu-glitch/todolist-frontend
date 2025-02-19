import {createAction, props} from '@ngrx/store';
import {ListState, List} from './list.state';

export const updatePosition = createAction('[Card] Update Position', props<{ list: List[], boardId: string }>())
export const updatePositionSuccess = createAction('[Card] Update Position Success', props<{ list: List[] }>())
export const updatePositionFailure = createAction('[Card] Update Position Failure', props<{ error: string }>())
