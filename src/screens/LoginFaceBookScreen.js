/**
 * Created by mkushnir on 24/10/2017.
 */
import React, {Component} from 'react'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
} = FBSDK;
import {View} from 'react-native';

export default class LoginFaceBookScreen extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={this.onLoginFinished}
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }

    onLoginFinished(error, result) {
        if (error) {
            alert("Login failed with error: " + result.error);
        }
        else if (result.isCancelled) {
            alert("Login was cancelled");
        }
        else {
            alert("Login was successful with permissions: " + result.grantedPermissions)
            this.props.navigator.switchToTab({
                tabIndex: 1,
            });
        }
    }
}