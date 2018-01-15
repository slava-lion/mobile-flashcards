import { RECEIVE_DECKS, GET_DECK, GET_CARDS_FOR_DECK, ADD_DECK, RENAME_DECK, DELETE_DECK, ADD_CARD, DELETE_CARD } from '../actions/index'

function reducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.key]: action.deck
      }
    case ADD_CARD: {
      return {
        ...state,
        [action.deckId]: [...state[action.deckId], action.card]
      }
    }
    default :
      return state
  }
}

export default reducer
