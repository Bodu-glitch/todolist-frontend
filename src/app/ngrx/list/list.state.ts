import {LabelState} from '../label/label.state';

export interface ListState {
  lists: List[]
  isGettingLists: boolean
  isGettingListsSuccess: boolean
  getListsError: string

  isAddingList: boolean
  isAddingListSuccess: boolean
  addListError: string

  isUpdatingLists: boolean
  isUpdatingListsSuccess: boolean
  updateListsError: string

  isUpdatingCard: boolean
  isUpdatingCardSuccess: boolean
  updateCardError: string

  isDeletingList: boolean
  isDeletingListSuccess: boolean
  deleteListError: string
}

export interface List {
  id: string
  title: string
  createAt: Date
  cards: CardSummary[]
}

export interface CardSummary {
  id: string
  title: string
  createAt: Date
  description: string
  labels: LabelState[]
}
