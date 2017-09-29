import React from 'react';
import { AsyncStorage } from 'react-native';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight, Dimensions, TextInput, Button} from 'react-native';
import UserData from '../data/userData';
import _ from 'underscore';

class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            token: '---',
            x: 'xx',
        }
    }

    /* TODO: should check whether this userId is indeed exists in DB */
    componentWillMount() {
        if (UserData.getUserId()) {
            this.setState({isLoggedIn: true});
        }
    }

    componentDidMount() {
        this.toggleNavBar();
        this.toggleTabs();
        /* check if used is already logged in if yes:
         1) show tabs, show navbar
         2) goto lists screen
         3) change login to logout
         */
        this.showLightBox()
    }

    onClose = () => {

    }

    toggleTabs = () => {
        const to = this._toggleTabs === 'shown' ? 'hidden' : 'shown';

        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: true,
        });
        this._toggleTabs = to;
    };

    toggleNavBar = () => {
        const to = this._toggleNavBar === 'shown' ? 'hidden' : 'shown';

        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: true,
        });
        this._toggleNavBar = to;
    };

    showLightBox = () => {
        return;
        this.props.navigator.showLightBox({
            screen: "a9.LightBox.Login",
            __DEV__: false,
            passProps: {
                title: 'Login',
                content: 'Hey there, I\'m a light box screen :D',
                onLogin: this.onClose,
                onSignUp: this.onClose,
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>{this.props.title}</Text>

                    <TextInput placeholder=" email" onChangeText={(email) => this.setState({email})}
                               value={this.state.email} autoCapitalize="none" autoCorrect={false}
                               style={{height: 40, marginTop: 10, borderColor: 'gray', borderWidth: 1}}/>
                    <TextInput placeholder=" password" secureTextEntry={true}
                               onChangeText={(password) => this.setState({password})}
                               style={{height: 40, marginTop: 10, borderColor: 'gray', borderWidth: 1}}/>
                </View>
                <View>
                    <Text >{this.state.token}</Text>
                    <Text >{this.state.password}</Text>
                    <Text >{this.state.email}</Text>
                    <Text >{this.state.x}</Text>
                </View>

                <View>
                    <Button
                        title={'Login'}
                        style={{backgroundColor: '#74HU67'}}
                        onPress={() => this.onLogin()}
                    />
                    <Button
                        title={'SignUp'}
                        onPress={() => this.onSignUp()}
                    />
                </View>
            </View>
        )
    }

    onSignUp() {
        console.log('zzzzzzzzzzzzz')
        if (!this.state.password || !this.state.email) this.setState({token: 'aaa'});
        return fetch('http://192.168.1.12:8000/register', {
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
                this.setState({token: res.json().status})
            })
            .catch((error) => {
                this.setState({token: 'error'})
                console.log('Error: ', error)
                return error;
            });

    }

    onLogin() {
        if (!this.state.password || !this.state.email) this.setState({token: 'aaa'});

        return fetch('http://192.168.1.12:8000/login', {
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
                console.log('res.json: ', res.token)
                return AsyncStorage.setItem('jwt', res.token)
            })
            .then(() => {
                alert(`Success! You may now access protected content.`)
                // Redirect to home screen
                this.props.navigator.pop()

            })
            .then(() => {
                console.log('res, retrieving token')
                return AsyncStorage.getItem('jwt')
                    .then((result2) => {
                        console.log('res, secret 2 res22: ', result2)
                        return result2;
                })

            })

            //.then((response) => response.json())
            .then((token) => fetch('http://192.168.1.12:8000/protected', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    })
            )
            .then((json) => json.json())
            .then(json => {
                console.log('res, secret: ', json)
                this.setState({
                    token: json
                })
            })
            .catch((error) => {
                this.setState({token: 'error'})
                console.log('Error: ', error)
                return error;
            });

    }

}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default LoginScreen;