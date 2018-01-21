import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import { fetchAllCards } from '../utils/AsyncStorageApi.js'
import { receiveDecks } from '../actions/index.js'
import { gray, white, black } from '../utils/colors'

export class Decks extends React.Component {

  state = {
    decks: '',
  }

  componentDidMount() {
    fetchAllCards().then(
     (data) => {
       let recievedData = data
       this.setState(() => ({ decks: recievedData, }))
       this.props.receiveDecks(recievedData)
     }
    )
  }

  showDeckDetailView = (key) => {
    this.props.navigation.navigate(
      'DeckDetails',
      { deckId: key }
    )
  }

  render () {
    let allDecks = this.props.decks

    return (
      <ScrollView>
        {Object.keys(allDecks).map((key) => {
          const currentDeck = allDecks[key]

          return (
            <TouchableHighlight key={key} style={styles.deckLine} underlayColor={gray} onPress={() => (this.showDeckDetailView(key))}>
              <View style={{flex : 1, justifyContent: 'center'}}>
                <Text style={{flex : 1, justifyContent: 'center'}}>
                  {currentDeck.title}
                </Text>
                <Text style={{flex : 1, justifyContent: 'center'}}>
                  {currentDeck.questions.length} cards
                </Text>
              </View>
            </TouchableHighlight>
          )
        })}

      </ScrollView>
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

function mapStateToProps (state, { navigation }) {
  return {
    decks: state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    receiveDecks: (data) => dispatch(receiveDecks(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
