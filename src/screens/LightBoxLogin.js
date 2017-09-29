import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Dimensions, Button} from 'react-native';

class LightBoxLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: '---',
            x: 'xx',
        }
    }
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
        this.props.navigator.dismissLightBox();
        this.props.navigator.push({
            screen: 'a9.OneList',
            passProps: {list: {title: 'from login', str: 'str'}},
        });
        return fetch('http://192.168.1.12:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        })
            .then((res, x) => {
                this.setState({token: 'OK login', x: x})
                this.props.navigator.push({
                    screen: 'a9.OneList',
                    passProps: {list: {title: 'from login', str: res}},
                });
                return this.state.token;
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


export default LightBoxLogin;