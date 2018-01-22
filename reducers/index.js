import { RECEIVE_DECKS, GET_DECK, GET_CARDS_FOR_DECK, ADD_DECK, RENAME_DECK, DELETE_DECK, ADD_CARD, DELETE_CARD } from '../actions/index'

function reducer(state = {}, action) {
  let newState = {...state};
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
      newState[action.deckId].questions.push(action.card);
      return newState
    }
    default :
      return state
  }
}

export default reducer
