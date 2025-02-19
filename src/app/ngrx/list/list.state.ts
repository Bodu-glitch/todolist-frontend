import {LabelState} from '../label/label.state';

export interface ListState {
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
