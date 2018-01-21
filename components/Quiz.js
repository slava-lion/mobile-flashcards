import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Platform, TouchableHighlight, TouchableOpacity } from 'react-native'
import { gray, white, black, purple, red, green } from '../utils/colors'

class Quiz extends React.Component {

  state = {
    score: 0,
    questionNumber: 1,
    visibleSide: 'front',  // front - question , back - answer
    finished: false,
  }

  increaseScore = () => {
    this.setState((state) => ({ score: (state.score + 1), }))
    this.nextQuestion()
  }

  nextQuestion = () => {
    if(this.state.questionNumber < this.props.questions.length) {
      this.setState((state) => ({ questionNumber: (state.questionNumber + 1), }))
    } else {
      this.setState((state) => ({ finished: true, }))
    }
  }

  flipCard = () => {
    if(this.state.visibleSide === 'front') {
      this.setState(() => ({ visibleSide: 'back', }))
    } else {
      this.setState(() => ({ visibleSide: 'front', }))
    }
  }

  restartQuiz = () => {
    this.setState(() => ({
      score: 0,
      questionNumber: 1,
      visibleSide: 'front',  // front - question , back - answer
      finished: false, }))
  }

  render() {
    const { visibleSide, questionNumber } = this.state
    const question = this.props.questions[questionNumber-1]

    return (
      <View style={styles.container}>
        {this.state.finished &&
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Your score {this.state.score} / {this.props.questions.length}
            </Text>

            <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1 }} onPress={this.restartQuiz}>
              <Text style={{margin: 20, textAlign: 'center', color: purple,}}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 20, borderColor: black, borderWidth: 1, backgroundColor: black }} onPress={this.props.goBack}>
              <Text style={{margin: 20, textAlign: 'center', color: white }}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        }
        {!this.state.finished &&
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
              <Text style={{justifyContent: 'flex-start'}}>
                {questionNumber} / {this.props.questions.length}
              </Text>
              <Text style={{justifyContent: 'flex-end'}}>
                score {this.state.score} / {this.props.questions.length}
              </Text>
            </View>
            <View style={{flex: 10}}>
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
          </View>
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
    justifyContent: 'space-between',
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
