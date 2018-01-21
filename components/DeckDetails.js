import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight, TouchableOpacity } from 'react-native'
import { fetchAllCards } from '../utils/AsyncStorageApi.js'
import { addCardToDeck } from '../actions/index.js'
import { gray, white, black, purple } from '../utils/colors'

class DeckDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckId,
    }
  }

  state = {
    deck: null,
  }

  componentWillMount = () => {
    this.setState({ deck: this.props.deck, })
  }

  addNewCard = () => {
    this.props.navigation.navigate(
      'AddNewCard', {
        deckId: this.props.deckId,
        onGoBack: (card) => this.refresh(card),
      }
    )
  }

  refresh = (card) => {
    // for trigerring re-render after go-back: show new card´s amount
    this.setState(() => ((state) => ({ deck: state.deck.questions.push(card), })))
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deckId }
    )
  }

  render() {
    const currentDeck = this.state.deck

      return (
        <View style={styles.container}>
          { currentDeck !== null &&
            <View style={styles.container}>
            <Text style={{justifyContent: 'center', textAlign: 'center', margin: 20}}>
              {currentDeck.title}
            </Text>
            <Text style={{justifyContent: 'center', textAlign: 'center', margin: 20}}>
              {currentDeck.questions.length} cards
            </Text>

            <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1 }} onPress={this.addNewCard}>
              <Text style={{margin: 20, textAlign: 'center', color: purple,}}>Add Card</Text>
            </TouchableOpacity>
            {currentDeck.questions.length > 0 &&
              <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1, backgroundColor: black }} onPress={this.startQuiz}>
                <Text style={{margin: 20, textAlign: 'center', color: white }}>Start Quiz</Text>
              </TouchableOpacity>
            }
            {currentDeck.questions.length === 0 &&
              <Text style={{justifyContent: 'center', textAlign: 'center', margin: 20}}>
                Quiz is not available, please add some cards
              </Text>
            }
          </View>
          }
          { currentDeck === null &&
            <Text style={{justifyContent: 'center', textAlign: 'center', margin: 20}}>
              Deck is not available
            </Text>
          }
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetails)
