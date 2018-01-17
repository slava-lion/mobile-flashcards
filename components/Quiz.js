import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight, TouchableOpacity } from 'react-native'
import { gray, white, black, purple, red, green } from '../utils/colors'

class Quiz extends React.Component {

  state = {
    score: 0,
    questions: null,
    questionNumber: 1,
    visibleSide: 'front',  // front - question , back - answer
  }

  increaseScore = () => {
    alert('correct')
  }

  nextQuestion = () => {
    alert('moving to next')
  }

  flipCard = () => {
    if(this.state.visibleSide === 'front') {
      this.setState(() => ({ visibleSide: 'back', }))
    } else {
      this.setState(() => ({ visibleSide: 'front', }))
    }
  }

  render() {
    const { visibleSide, questionNumber } = this.state
    const question = this.props.questions[questionNumber]

    return (
      <View style={styles.container}>
        <View>
          <Text style={{justifyContent: 'center'}}>
            {JSON.stringify(question)},{JSON.stringify(visibleSide)}
          </Text>
        </View>

        {visibleSide === 'front' &&
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {question.question}
            </Text>
            <TouchableHighlight onPress={this.flipCard}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ justifyContent: 'center', color: red }}>
                  Answer
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        }
        {visibleSide === 'back' &&
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {question.answer}
            </Text>
            <TouchableHighlight onPress={this.flipCard}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ justifyContent: 'center', color: red }}>
                  Question
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        }

        <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1, backgroundColor: green }} onPress={this.increaseScore}>
          <Text style={{margin: 20, textAlign: 'center', color: white,}}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1, backgroundColor: red }} onPress={this.nextQuestion}>
          <Text style={{margin: 20, textAlign: 'center', color: white }}>Incorrect</Text>
        </TouchableOpacity>
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
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  cardText: {
    justifyContent: 'center',
    fontSize: 40,
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    questions: state[deckId].questions,
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
)(Quiz)
