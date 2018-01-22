import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native'
import { submitNewCard } from '../utils/AsyncStorageApi.js'
import { addCardToDeck } from '../actions/index.js'
import { gray, white, black, purple, red } from '../utils/colors'

class AddNewCard extends React.Component {
  navigationOptions = ({ navigation }) => {
    return {
      title: 'Add card to ' + navigation.state.params.deckId + ' deck',
    }
  }

  state = {
    cardQuestion: null,
    cardAnswer: null,
    errorMessage: null,
  }

  onPress = () => {
    let { addCardToDeck, goBack, onGoBack, deckId } = this.props
    const card = {}
    card['question'] = this.state.cardQuestion
    card['answer'] = this.state.cardAnswer
    if(this.validateCard(card)) {
      addCardToDeck(card)
      submitNewCard(deckId, card)
      this.setState({ cardQuestion: null, cardAnswer: null, })
      onGoBack(card)
      goBack()
    }
  }

  validateCard(card) {
    let errorMessage = ''
    if(card.question === null || card.question.length === 0) {
      errorMessage = errorMessage + ' question could not be empty '
    }
    if(card.answer === null || card.answer.length === 0) {
      errorMessage = errorMessage + ' answer could not be empty '
    }
    if(errorMessage.length > 0) {
      this.setState({ errorMessage: errorMessage, })
      return false
    } else {
      return true
    }
  }

  render () {
    const placeholderCardQuestion = 'enter the question here'
    const placeholderCardAnswer = 'enter the answer here'

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.center}>
          Add card with new question to the deck {this.props.deckId}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ cardQuestion: text, })}
          value={this.state.cardQuestion}
          placeholder={placeholderCardQuestion}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ cardAnswer: text, })}
          value={this.state.cardAnswer}
          placeholder={placeholderCardAnswer}
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
    fontSize: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
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

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId, onGoBack } = navigation.state.params

  return {
    addCardToDeck: (card) => dispatch(addCardToDeck(deckId, card)),
    // goBack: () => navigation.navigate('DeckDetails', { deckId: deckId }),
    goBack: () => navigation.goBack(),
    onGoBack: (card) => onGoBack(card),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard)
