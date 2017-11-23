import React, {Component} from 'react';
import LocalStorageAsync from '../data/LocalStorageAsync';
import {StyleSheet, View, Text, ScrollView, Button, TouchableHighlight, Dimensions, TextInput} from 'react-native';
import UserData from '../data/userData';
import ServerData from '../data/serverData';
import TimerMixin from 'react-timer-mixin';
import _ from 'underscore';
import LoginFaceBookScreen from "./LoginFaceBookScreen";
//import { Button } from 'react-native-elements';

class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            title: 'WeDoZe',
            email: '',
            password: '',
            token: '',
            error: ''
        }
    }

    /* TODO: should check whether this userId is indeed exists in DB */
    componentWillMount() {
        if (UserData.getUserId()) {
            this.setState({isLoggedIn: true});
        }
    }

    componentDidMount() {
        return this.checkIfUserLoggedIn()
            .then(isAlreadyLoggedIn => {
                if (isAlreadyLoggedIn === true) {
                    this.props.navigator.switchToTab({
                        tabIndex: 1,
                    });
                } else {
                    this.hideBars();
                }
            })
        /* check if used is already logged in if yes:
         1) show tabs, show navbar
         2) goto lists screen
         3) change login to logout
         */
    }

    checkIfUserLoggedIn() {
        /** The code below to use in very first stage
         * for checking loggedIn state
         * */
        return LocalStorageAsync.get('jwt_token')
         .then(token => fetch(ServerData.getServerUrl() + '/protected', {
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
             }
         }))
            .then(result => {
                if (result.ok) {
                    UserData.setToken(token);
                    return true;
                } else {
                    return false;
                }
            })
    }

    showBars() {
        this.props.navigator.toggleNavBar({
            to: 'shown',
            animated: true,
        });
        this.props.navigator.toggleTabs({
            to: 'shown',
            animated: true,
        });
    }

    hideBars() {
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: true,
        });
        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: true,
        });
    }

    onSignUp() {
        console.log('zzzzzzzzzzzzz')
        if (!this.state.password || !this.state.email) this.setState({token: 'aaa'});
        return fetch(ServerData.getServerUrl() + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: this.state.email,
                password: this.state.password
            }
        })
            .then((res) => {
                this.setState({token: 'res.json().status'})
            })
            .catch((error) => {
                this.setState({token: 'error'})
                console.log('Error: ', error)
                return error;
            });

    }

    onLogin() {
        if (!this.state.password || !this.state.email) {
            this.setState({error: 'Please enter email and password'});
            //this.setTimeout(() => this.setState({error: 'Please enter email and password'}), 1000)
            return;
        }
        this.props.navigator.setSubTitle({
            subtitle: "Connecting..."
        });
        this.setState({error: ''});
        return fetch(ServerData.getServerUrl() + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then((res) => {
                if (res.error) {
                    throw Error (res.error)
                } else {
                    /** remove 'connecting...' from title
                    this.props.navigator.setSubTitle({
                    });
                    /** storing token locally */
                    LocalStorageAsync.set('jwt_token', res.token)
                    return res.token;
                }
            })
            .then((token) => {
                console.log('res, retrieving token')

                return token
            })
            .then((token) => fetch(ServerData.getServerUrl() + '/protected', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    })
            )
            .then((response) => response.json())
            .then(json => {

                console.log('res, secret: ', json.secret)
                this.setState({
                    token: json.secret
                });
                this.showBars();
                /*this.props.navigator.showInAppNotification({
                    screen: 'example.Types.Notification',
                });*/
                this.props.navigator.switchToTab({
                    tabIndex: 1,
                });
                /*this.props.navigator.push({
                    screen: 'example.Actions',
                    passProps: {list: {title: 'from login', str: 'str'}},
                });*/

            })
            .catch((error) => {
                this.setState({error: 'Invalid credentials!'})
                console.log('Error caught: ', error)
                return error;
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>

                    <Text style={styles.title}>WeDoZe</Text>
                    <View style={styles.loginButtonView}>
                        <LoginFaceBookScreen/>
                    </View>

                    {/*<TextInput placeholder=" email" onChangeText={(email) => this.setState({email})}*/}
                               {/*value={this.state.email} autoCapitalize="none" autoCorrect={false}*/}
                               {/*style={{height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1, width: '90%'}}/>*/}
                    {/*<TextInput placeholder=" password" secureTextEntry={true}*/}
                               {/*onChangeText={(password) => this.setState({password})}*/}
                               {/*style={{height: 40, marginTop: 15, borderColor: 'gray', borderWidth: 1, width: '90%'}}/>*/}
                    {/*<Text style={styles.error}>{this.state.error}</Text>*/}
                </View>
                {/*<View style={styles.buttonsContainer}>
                    <Button
                        title={'Login'}
                        style={styles.button}
                        onPress={() => this.onLogin()}
                    />
                    <Button
                        title={'SignUp'}
                        style={styles.button}
                        onPress={() => this.onSignUp()}
                    />
                </View>*/}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    buttonsContainer: {
       flexDirection: 'row',
    },
    button: {
        backgroundColor: 'red',
        color: 'green',
        borderRadius: 10
    },
    loginButtonView: {
        marginTop: 250,
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: Dimensions.get('window').height * 0.5,
        marginTop: 20,
        padding: 16,
        //width: Dimensions.get('window').width * 0.9,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center'
    },
    content: {
        marginTop: 8,
    },
    error: {
        color: 'red',
        marginLeft: 7,
        marginTop: 11,
        fontSize: 14,
    }
});

export default LoginScreen;