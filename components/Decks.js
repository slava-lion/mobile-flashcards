import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import { fetchAllCards } from '../utils/AsyncStorageApi.js'
import { gray, white, black } from '../utils/colors'

export default class Decks extends React.Component {

  state = {
    decks: '',
  }

  componentDidMount() {
    fetchAllCards().then((data) => this.setState(() => ({ decks: data, })))
  }

  showDeckDetailView = (key) => {
    alert(key)
  }

  render () {

    return (
      <View>
        <Text>
          here will be decks {JSON.stringify(this.state.decks)}
        </Text>
        {Object.keys(this.state.decks).map((key) => {
          const currentDeck = this.state.decks[key]

          return (
            <TouchableHighlight key={key} style={styles.deckLine} underlayColor={gray} onPress={() => (this.showDeckDetailView(key))}>
              <View>
                <Text>
                  {currentDeck.title}
                </Text>
                <Text>
                  {currentDeck.questions.length} cards
                </Text>
            </View>
            </TouchableHighlight>
          )
        })}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckLine: {
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: black,
  },

})
