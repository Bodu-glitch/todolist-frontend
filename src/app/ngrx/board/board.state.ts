import {ListState, List} from '../list/list.state';
import {LabelState} from '../label/label.state';

export interface BoardState {
  board: Board | null

  isGettingBoard: boolean
  isGettingBoardSuccess: boolean
  getBoardError: string

  searchBoards: Board[]
  isSearchingBoards: boolean
  isSearchingBoardsSuccess: boolean
  searchBoardsError: string
}

export interface Board {
  id: string
  name: string
  backgroundId: string
  createAt: Date
  lists: List[] | unknown
  owner: string
  members: string[]
  labels: LabelState[]
}

