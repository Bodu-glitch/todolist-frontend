import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {BoardService} from '../../services/board/board.service';
import {ListService} from '../../services/list/list.service';

import * as boardActions from './board.actions';
import {catchError, map, switchMap, of, forkJoin} from 'rxjs';
import {ListState, List} from '../list/list.state';
import {Board} from './board.state';

export const getBoard$ = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService), listService = inject(ListService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoard),
      switchMap(({boardId}) =>
        forkJoin({
          board: boardService.getBoard(boardId),
          lists: listService.getLists(boardId)
        }).pipe(
          map(({board, lists}) => {
            if (!board) {
              throw new Error('Board not found');
            }
            return boardActions.getBoardSuccess({
              board: {
                ...board,
                lists: lists || [] as List[]
              }
            });
          }),
          catchError((error) => {
            console.error('Error fetching board:', error);
            return of(boardActions.getBoardFailure({errorMessage: error.message || 'Unknown error'}));
          })
        )
      )
    );
  },
  {functional: true}
);
