import {Navigation} from 'react-native-navigation';

import Types from './Types';
import MyLists from './MyLists';
import LoginScreen from './LoginScreen';
import LightBoxLogin from './LightBoxLogin';
import OneList from './OneList';

import Actions from './Actions';
import Transitions from './Transitions';

import Push from './types/Push';
import Drawer from './types/Drawer';
import LightBox from './types/LightBox';
import Notification from './types/Notification';
import Modal from './types/Modal';
import TopTabs from './types/TopTabs';
import TabOne from './types/tabs/TabOne';
import TabTwo from './types/tabs/TabTwo';

import CollapsingHeader from './transitions/CollapsingHeader';
import SharedElementTransitions from './transitions/SharedElementTransitions';

import Cards from './transitions/sharedElementTransitions/Cards/Cards';
import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';

import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';

export default function () {
  Navigation.registerComponent('a9.MyLists', () => MyLists);
  Navigation.registerComponent('a9.OneList', () => OneList);
  Navigation.registerComponent('a9.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('a9.Lists', () => Types);
  Navigation.registerComponent('a9.LightBox.Login', () => LightBoxLogin);

  Navigation.registerComponent('example.Actions', () => Actions);
  Navigation.registerComponent('example.Transitions', () => Transitions);

  Navigation.registerComponent('example.Types.Push', () => Push);
  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.Screen', () => Drawer);
  Navigation.registerComponent('example.Types.Modal', () => Modal);
  Navigation.registerComponent('example.Types.LightBox', () => LightBox);
  Navigation.registerComponent('example.Types.Notification', () => Notification);
  Navigation.registerComponent('example.Types.TopTabs', () => TopTabs);
  Navigation.registerComponent('example.Types.TopTabs.TabOne', () => TabOne);
  Navigation.registerComponent('example.Types.TopTabs.TabTwo', () => TabTwo);

  Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions', () => SharedElementTransitions);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry', () => Masonry);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
}
