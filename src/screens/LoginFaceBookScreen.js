/**
 * Created by mkushnir on 24/10/2017.
 */
import React from 'react'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
} = FBSDK;
import {View} from 'react-native';

export default class LoginFacebookScreen extends React.Component {
    render() {
        return (

                <LoginButton
                    publishPermissions={["user_friends"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                alert("Login was successful with permissions: " + result.grantedPermissions)
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")}/>
        );
    }
}