import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

class Modal extends React.Component {

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       title: 'Edit', // for a textual button, provide the button title (label)
  //       id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      
  //       disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
  //       disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
  //       showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
  //       buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
  //       buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
  //       buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
  //     },
  //     {
  //       icon: require('../../../img/three@2x.png'), // for icon button, provide the local image asset name
  //       id: 'dismissModal' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  //     }
  //   ]
  // };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(e => this.onNavEvent.bind(this, e));
  }

  onNavEvent(e) {
    if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
        AlertIOS.alert('NavBar', 'Edit button pressed');
    }

    if (event.id == 'dismissModal') { // this is the same id field from the static navigatorButtons definition
        AlertIOS.alert('NavBar', 'dismissModal button pressed');
        this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
    }

    console.log("On NAV event: ", e); 
    this.switchToTab.call(this);
  }

  switchToTab = () => {
    this.props.navigator.switchToTab({
      tabIndex: 0,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Modal Screen</Text>
        <Button onPress={this.switchToTab.bind(this)} title="Learn Less" style={styles.button}/>
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
    backgroundColor: '#e0e0e0'
  }
});

export default Modal;
