//https://wix.github.io/react-native-navigation/#/top-level-api?id=dismissmodalparams-
import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight} from 'react-native';
import Row from '../components/Row';
import Catalog from '../data/Catalog';
import _ from 'underscore';


class MyLists extends React.Component {

    constructor() {
        super();
        this.catalog = new Catalog();
        this.state = {
            isLoading: false,
            lists: [],
        };
    }

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Edit', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked

                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            },
            {
                icon: require('../../img/three@2x.png'), // for icon button, provide the local image asset name
                id: 'dismissModal', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                buttonColor: 'green',

            }
        ]
    };

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    };

    pushScreen = (list) => {
        console.log('pushScreen: ', list)
        this.props.navigator.push({
            screen: 'a9.OneList',
            title: list.title,
            passProps: {list: list},
        });
    };

    pushTopTabsScreen = () => {
        this.props.navigator.push({
            screen: 'example.Types.TopTabs',
            title: 'Top Tabs',
            topTabs: [{
                screenId: 'example.Types.TopTabs.TabOne',
                title: 'Tab One',
            }, {
                screenId: 'example.Types.TopTabs.TabTwo',
                title: 'Tab Two',
            }],
        });
    };

    showModal = () => {
        this.props.navigator.showModal({
            screen: 'example.Types.Modal',
            title: 'Modal',
            animationType: 'slide-up',
            navigatorButtons: navigatorButtons
        });
    };

    showLightBox = () => {
        this.props.navigator.showLightBox({
            screen: "example.Types.LightBox",
            passProps: {
                title: 'LightBox',
                content: 'Hey there, I\'m a light box screen :D',
                onClose: this.dismissLightBox,
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
        });
    };

    dismissLightBox = () => {
        this.props.navigator.dismissLightBox();
    };

    showInAppNotification = () => {
        this.props.navigator.showInAppNotification({
            screen: 'example.Types.Notification',
        });
    };

    componentWillMount() {
        console.log('componentWillMount - ');
        this.setState({isLoading: true})
        this.catalog.getAllUserLists()
            .then((lists) => {
                console.log('all my lists: ', lists);
                this.setState({
                    isLoading: false,
                    lists: lists
                })
            })
    }

    render() {
        var lists = <Text>No lists found, create one now!</Text>;
        if (this.state.lists.length) {
            lists =
                _.map(this.state.lists, list => {
                    return <Row title={list.title}
                                testID={list._id}
                                key={list._id}
                                onPress={this.pushScreen.bind(this, list)}/>
                })
        }
        else if (this.state.isLoading) {
            var lists = <Text>Loading ...</Text>
        }
        return (
            <ScrollView style={styles.container}>
                {lists}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
    },
});

export default MyLists;
