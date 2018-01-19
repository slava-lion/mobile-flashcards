import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native'
import { submitNewCard } from '../utils/AsyncStorageApi.js'
import { addCardToDeck } from '../actions/index.js'
import { gray, white, black, purple } from '../utils/colors'

class AddNewCard extends React.Component {
  navigationOptions = ({ navigation }) => {
    return {
      title: 'Add card to ' + navigation.state.params.deckId + ' deck',
    }
  }

  state = {
    cardQuestion: null,
    cardAnswer: null,
  }

  onPress = () => {
    let { addCardToDeck, goBack, deckId } = this.props
    let card = {}
    card['question'] = this.state.cardQuestion
    card['answer'] = this.state.cardAnswer
    addCardToDeck(card)
    submitNewCard(deckId, card)
    this.setState({ cardQuestion: null, cardAnswer: null, })
    goBack()
  }

  render () {
    const placeholderCardQuestion = 'enter the question here'
    const placeholderCardAnswer = 'enter the answer here'

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.center, {fontSize: 20, }]}>
          Add card with new question to the deck {this.props.deckId}
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, }}
          onChangeText={(text) => this.setState({ cardQuestion: text, })}
          value={this.state.cardQuestion}
          placeholder={placeholderCardQuestion}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, }}
          onChangeText={(text) => this.setState({ cardAnswer: text, })}
          value={this.state.cardAnswer}
          placeholder={placeholderCardAnswer}
        />
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
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: state,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    addCardToDeck: (card) => dispatch(addCardToDeck(deckId, card)),
    // goBack: () => navigation.navigate('DeckDetails', { deckId: deckId }),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard)
