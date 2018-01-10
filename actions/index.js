export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const GET_CARDS_FOR_DECK = 'GET_CARDS_FOR_DECK'
export const ADD_DECK = 'ADD_DECK'
export const RENAME_DECK = 'RENAME_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function getCardsForDeck(deck) {
  return {
    type: GET_CARDS_FOR_DECK,
    deck,
  }
}

export function addCardToDeck() {
  return {
    type: ADD_CARD,
    deck,
  }
}
