import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import ddpClient from './ddp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      signedIn: false,
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '121162566312-ldll9tn6fkjqu3qilgcpgrbgkfe8lo4o.apps.googleusercontent.com',
      offlineAccess: false
    });

    ddpClient.connect((error, wasReconnect) => {
      if (error) {
        this.setState({connected: false});
        console.log("DDP connection denied.");
      } else {
        this.setState({connected: true});
        console.log("DDP connection made.");
        ddpClient.loginWithToken((err, res) => {
          if (!err) {
            this.handleSignedInStatus(true);
          }
        });
      }
    });
  }

  handleSignedInStatus(status = false) {
    this.setState({ signedIn: status });
    console.log(this.state.signedIn);
  }

  render() {
    let { connected, signedIn } = this.state;

    if (connected && signedIn) {
      return(
        <SignOut changedSignedIn={(status) => this.handleSignedInStatus(status)}/>
      );
    } else  {
      return(
        <SignIn changedSignedIn={(status) => this.handleSignedInStatus(status)}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
