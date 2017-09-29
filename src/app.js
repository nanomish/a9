//@flow
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import registerScreens from './screens';

// screen related book keeping
registerScreens();

const tabs = [
  {
    label: 'Login',
    screen: 'a9.LoginScreen',
    icon: require('../img/three@2x.png'),
    title: 'Login',
  }, {
    label: 'My Lists',
    screen: 'a9.MyLists',
    icon: require('../img/three@2x.png'),
    title: 'My Lists',
  }, {
    label: 'Lists',
    screen: 'a9.Lists',
    icon: require('../img/list.png'),
    title: 'Lists',
  }, {
    label: 'Actions',
    screen: 'example.Actions',
    icon: require('../img/swap.png'),
    title: 'Navigation Actions',
}];

if (Platform.OS === 'android') {
  tabs.push({
    label: 'Transitions',
    screen: 'example.Transitions',
    icon: require('../img/transform.png'),
    title: 'Navigation Transitions',
  });
}

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#003a66',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#003a66',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  drawer: {
    left: {
      screen: 'example.Types.Drawer'
    }
  }
});
