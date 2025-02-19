import {createAction, props} from '@ngrx/store';
import {ListState, List} from './list.state';

export const updatePosition = createAction('[Card] Update Position', props<{ list: List[], boardId: string }>())
export const updatePositionSuccess = createAction('[Card] Update Position Success', props<{ list: List[] }>())
export const updatePositionFailure = createAction('[Card] Update Position Failure', props<{ error: string }>())

export const updateCard = createAction('[Card] Update Card', props<{ previousList: List, list: List, boardId: string }>())
export const updateCardSuccess = createAction('[Card] Update Card Success', props<{ list: List[] }>())
export const updateCardFailure = createAction('[Card] Update Card Failure', props<{ error: string }>())
