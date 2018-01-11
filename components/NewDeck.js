import React from 'react'
import { ScrollView, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'

export class AddNewDeck extends React.Component {
  state = {
    deckTitle: null,
  }

  onPress = () => {

  }

  render () {
    const placeholder = 'enter the title here'

    return (
      <ScrollView style={styles.container}>
        {this.props.decks}
        <Text style={[styles.center, {fontSize: 20, }]}>
          Type the title of your new decks
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.deckTitle}
          placeholder={placeholder}
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
    backgroundColor: white
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

function mapStateToProps (state) {
  return {
    decks: state,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    remove: (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewDeck)
