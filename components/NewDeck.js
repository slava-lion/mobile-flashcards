import React from 'react'
import { ScrollView, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { purple, white, red } from '../utils/colors'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/AsyncStorageApi.js'
import { addDeck } from '../actions/index.js'
import { CustomStatusBar } from '../utils/helpers'

export class AddNewDeck extends React.Component {
  state = {
    deckTitle: null,
    errorMessage: null,
  }

  onPress = () => {
    let { navigateToDecks, addDeck } = this.props
    let deckTitle = this.state.deckTitle
    let deck = {}
    deck['title'] = deckTitle
    deck['questions'] = []
    if(this.validateDeck(deck)) {
      let key = deckTitle.trim().replace(/\s/g, '')
      submitDeck(deck, key)
      addDeck(deck, key)
      this.setState({ deckTitle: null, })
      this.navigateToDeck(key)
    }
  }

  validateDeck(deck) {
    let errorMessage = ''
    if(deck.title === null || deck.title.length === 0) {
      errorMessage = errorMessage + ' deck´s title could not be empty '
    }
    if(errorMessage.length > 0) {
      this.setState({ errorMessage: errorMessage, })
      return false
    } else {
      return true
    }
  }

  navigateToDeck = (deckId) => {
    this.props.navigation.navigate(
      'DeckDetails',
      { deckId: deckId }
    )
  }

  render () {
    const placeholder = 'enter the title here'

    return (
      <View style={{flex: 1,}}>
        <CustomStatusBar backgroundColor={'#757575'} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Text style={[styles.center, {fontSize: 20, }]}>
            Type the title of your new decks
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, }}
            onChangeText={(text) => this.setState({ deckTitle: text, })}
            value={this.state.deckTitle}
            placeholder={placeholder}
          />
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={this.onPress}>
              <Text style={styles.submitBtnText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 40,
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 40,
    fontSize: 20,
    color: red,
  }
})

function mapStateToProps (state) {
  return {
    decks: state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addDeck: (deck, key) => dispatch(addDeck(deck, key)),
    navigateToDecks: () => navigation.navigate('Decks'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewDeck)
