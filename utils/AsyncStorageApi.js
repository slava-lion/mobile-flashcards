import { AsyncStorage } from 'react-native'
import { formatCardsData, createNotification } from './helpers.js'
import { Notifications, Permissions } from 'expo'

export const CARDS_STORAGE_KEY = 'UdaciFlashCards:cards'
export const NOTIFICATION_KEY = 'UdaciFlashCards:notifications'

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

// NOTIFICATIONS

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let nextNotification = new Date()
              nextNotification.setDate(nextNotification.getDate() + 1)
              nextNotification.setHours(8)
              nextNotification.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: nextNotification,
                  repeat: 'hour',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
