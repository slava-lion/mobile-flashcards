import { AsyncStorage } from 'react-native'
import { formatCardsData } from './helpers.js'

export const CARDS_STORAGE_KEY = 'UdaciFlashCards:cards'

export function fetchAllCards () {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(formatCardsData)
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [deck.key]: deck
  }))
}
