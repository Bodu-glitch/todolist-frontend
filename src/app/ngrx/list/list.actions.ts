import {createAction, props} from '@ngrx/store';
import {ListState, List} from './list.state';

export const addNewList = createAction('[List] Add New List', props<{ list: List, boardId: string }>())
export const addNewListSuccess = createAction('[List] Add New List Success', props<{ list: List[] }>())
export const addNewListFailure = createAction('[List] Add New List Failure', props<{ error: string }>())

export const storeLists = createAction('[List] Store Lists', props<{ lists: List[] }>())

export const updatePosition = createAction('[Card] Update Position', props<{ list: List[], boardId: string }>())
export const updatePositionSuccess = createAction('[Card] Update Position Success', props<{ list: List[] }>())
export const updatePositionFailure = createAction('[Card] Update Position Failure', props<{ error: string }>())

export const updateCard = createAction('[Card] Update Card', props<{
  previousList: List,
  list: List,
  boardId: string
}>())
export const updateCardSuccess = createAction('[Card] Update Card Success', props<{ list: List[] }>())
export const updateCardFailure = createAction('[Card] Update Card Failure', props<{ error: string }>())

export const deleteList = createAction('[List] Delete List', props<{ listId: string }>())
export const deleteListSuccess = createAction('[List] Delete List Success', props<{ listId: string }>())
export const deleteListFailure = createAction('[List] Delete List Failure', props<{ error: string }>())
