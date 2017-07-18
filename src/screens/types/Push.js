import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import Row from '../../components/Row';
import {Navigation} from 'react-native-navigation';

class Push extends React.Component {

  constructor(props) {
    super(props);
  }

  switchToTab = () => {
    this.props.navigator.switchToTab({
      tabIndex: 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Pushed Screen</Text>
        <Button onPress={this.switchToTab} title="go to actions tab" style={styles.button}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    color: '#841584',
    backgroundColor: '#000000'
  },
});

export default Push;
