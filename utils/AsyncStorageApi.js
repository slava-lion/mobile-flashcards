import { AsyncStorage } from 'react-native'
import { formatCardsData } from './helpers.js'

export const CARDS_STORAGE_KEY = 'UdaciFlashCards:cards'

export function fetchAllCards () {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(formatCardsData)
}

export function submitDeck(deck, key) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitNewCard(deckId, card) {
  AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((data) => {
      let storage = JSON.parse(data)
      let modifiedDeck = storage[deckId]
      modifiedDeck.questions.push(card)
      submitDeck(modifiedDeck, deckId)
    })
}

export function clearStorage() {
  AsyncStorage.clear()
}
