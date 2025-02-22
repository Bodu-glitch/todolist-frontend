import * as listActions from './list.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ListService} from '../../services/list/list.service';
import {catchError, map, of, switchMap} from 'rxjs';

export const addList$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.addNewList),
      switchMap(({list, boardId}) => {
        return listService.addNewList(list, boardId).pipe(
          map((list: any) => listActions.addNewListSuccess({list})),
          catchError((error) => of(listActions.addNewListFailure({error: error.message || 'Unknown error'})))
        );
      })
    );
  }, {
    functional: true
  }
);

export const updatePosition$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.updatePosition),
      switchMap(({list, boardId}) => {
        return listService.updateLists(list, boardId).pipe(
          map((list: any) => {
            console.log(list);
            return listActions.updatePositionSuccess({list});
          }),
          catchError((error) => of(listActions.updatePositionFailure({error: error.message || 'Unknown error'})))
        );
      })
    );
  }, {
    functional: true
  }
);

export const updateCard$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.updateCard),
      switchMap(({previousList, list, boardId}) => {
        return listService.updateListCard(previousList, list, boardId).pipe(
          map((value, index) => listActions.updateCardSuccess(value as any)),
          catchError((error) => of(listActions.updateCardFailure({error: error.message || 'Unknown error'}))
          ));
      })
    );
  }, {
    functional: true
  }
)

export const deleteList$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.deleteList),
      switchMap(({listId}) => {
        return listService.deleteList(listId).pipe(
          map(() => listActions.deleteListSuccess({listId})),
          catchError((error) => of(listActions.deleteListFailure({error: error.message || 'Unknown error'}))
          ));
      })
    );
  }, {
    functional: true
  }
)
