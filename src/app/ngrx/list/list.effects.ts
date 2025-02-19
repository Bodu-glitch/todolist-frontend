import * as listActions from './list.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ListService} from '../../services/list/list.service';
import {catchError, map, of, switchMap} from 'rxjs';

export const updatePosition$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.updatePosition),
      switchMap(({list, boardId}) => {
        return listService.updateLists(list, boardId).pipe(
          map(() => listActions.updatePositionSuccess({list})),
          catchError((error) => of(listActions.updatePositionFailure({error: error.message || 'Unknown error'}))
          ));
      })
    );
  }, {
    functional: true
  }
)
